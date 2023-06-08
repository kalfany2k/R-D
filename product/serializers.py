from .signals import order_created
from .models import Cart, CartItem, Category, Customer, Event, EventCreator, Order, OrderItem
from django.db import transaction
from rest_framework import serializers
from core.models import User
from location.models import Location
from location.serializers import LocationSerializer





class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model =  Category
        fields = ['id', 'title', 'events_count']

    events_count = serializers.IntegerField(read_only=True) 


class EventSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    category = serializers.SlugRelatedField(many=True, read_only=True, slug_field='title')

    class Meta:
        model = Event
        fields = ['id', 'title', 'price', 'location', 'category',
                  'age_restriction', 'start_date', 'end_date',
                  'price', 'description', 'inventory']


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
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    user_id = serializers.SerializerMethodField()
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_user_id(self, cart):
        return cart.user.id if cart.user else None

    def get_total_price(self, cart):
        return sum([item.quantity * item.event.price for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ['user', 'user_id', 'items', 'total_price']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = self.context['request'].user
        if not user.is_authenticated:
            # Exclude user_id field if the user is not authenticated
            representation.pop('user_id', None)
        return representation



class AddCartItemSerializer(serializers.ModelSerializer):
    event_id = serializers.IntegerField()
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def validate_event_id(self, value):
        if not Event.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No event with the given ID was found.')
        return value

    def save(self, **kwargs):
        event_id = self.validated_data['event_id']
        quantity = self.validated_data['quantity']
        user = self.validated_data['user']

        try:
            cart_item = CartItem.objects.get(cart__user=user, event_id=event_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            cart = Cart.objects.get(user=user)
            self.instance = CartItem.objects.create(cart=cart, **self.validated_data)

        return self.instance

    class Meta:
        model = CartItem
        fields = ['id', 'event_id', 'quantity', 'user']

class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'phone', 'birth_date', 'first_name', 'last_name']


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



