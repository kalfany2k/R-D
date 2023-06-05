from rest_framework import serializers
from decimal import Decimal
from django.db import transaction
from core.models import User

from location.models import Location
from .signals import order_created
from .models import Cart, CartItem, Category, Customer, Event, EventCreator, Order, OrderItem



class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','title','price', 'location']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model =  Category
        fields = ['id', 'title', 'events_count']

    events_count = serializers.IntegerField(read_only=True)   

class SimpleEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'price']

class CartItemSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart_item: CartItem):
        return cart_item.quantity * cart_item.event.price

    class Meta:
        model = CartItem
        fields = ['id', 'event','quantity', 'total_price']


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum([item.quantity * item.event.price for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']



class AddCartItemSerializer(serializers.ModelSerializer):
    event_id =serializers.IntegerField()

    def validate_event_id(self, value):
        if not Event.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No event with the given ID was found.')
        return value

            
    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        event_id = self.validated_data['event_id']
        quantity = self.validated_data['quantity']

        try: 
            cart_item = CartItem.objects.get(cart_id=cart_id, event_id=event_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(cart_id=cart_id, **self.validated_data)
        
        return self.instance
    class Meta:
        model = CartItem
        fields = ['id','event_id', 'quantity']


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'phone', 'birth_date', 'first_name']


class EventCreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventCreator
        fields = ['id', 'phone', 'birth_date']


class OrderItemSerializer(serializers.ModelSerializer):
    event = SimpleEventSerializer()
    price = serializers.DecimalField(source='event.price', max_digits=6, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ['id', 'event', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order 
        fields = ['id', 'customer','placed_at','payment_status','items']


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status']


class CreateOrderSerializer(serializers.Serializer):
    cart_it = serializers.UUIDField()

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError(
                'No cart with the given ID was found.')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty.')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            customer = Customer.objects.get(user_id=self.context['user_id'])
            order = Order.objects.create(customer= customer)
            cart_items = CartItem.objects.select_related('product').filter(cart_id = self.validated_data['cart_id'])
            order_items = [
                OrderItem(
                order=order,
                product = item.product,
                unit_price = item.product.unit_price,
                quantity = item.quantity
                ) for item in cart_items]
            
            OrderItem.objects.bulk_create(order_items)
            
            Cart.objects.filter(pk=self.validated_data['cart_id']).delete()
            
            order_created.send_robust(self.__class__, order=order)

            return order


class CreateEventSerializer(serializers.ModelSerializer):
    location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())

    class Meta:
        model = Event
        fields = ['title', 'price', 'location']

    def create(self, validated_data):
        location = validated_data.pop('location')
        event = Event.objects.create(location=location, **validated_data)
        return event
    


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
            # Add any other fields you want to set for the User model during registration
        )
        # Create the associated Customer instance
        customer = Customer.objects.create(
            user=user,
            phone=validated_data['phone'],
            birth_date=validated_data['birth_date']
            # Add any other fields you want to set for the Customer model during registration
        )
        return customer

    class Meta:
        model = User
        fields = ['username', 'password', 'phone', 'birth_date']