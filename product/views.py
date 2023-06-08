import uuid

from django.shortcuts import get_object_or_404

from location.serializers import LocationSerializer
from .models import Cart, CartItem, Customer, Event, Order, OrderItem, Category
from .filters import EventFilter
from .serializers import (
    AddCartItemSerializer, CartItemSerializer, CartSerializer, CategorySerializer,
    CreateOrderSerializer, CustomerSerializer, EventSerializer, OrderSerializer,
    UpdateCartItemSerializer, UpdateOrderSerializer
)
from core.serializers import UserCreateSerializer, UserSerializer
from location.models import Location


from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin
from rest_framework.exceptions import APIException

from django.db import transaction
from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.annotate(
        products_count=Count('events')).all()
    serializer_class = CategorySerializer
    #permission_classes = [IsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        if Event.objects.filter(Category_id=kwargs['pk']):
            return Response({'error': 'Category cannot be deleted because it includes one or more events.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        return super().destroy(request, *args, **kwargs)



class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = EventFilter
    #permission_classes = [IsAdminOrReadOnly]

    search_fields = ['title', 'category']
    ordering_fields = ['unit_price', 'last_update']


    def get_serializer_context(self):
        return {'request': self.request}
    
    def destroy(self, request, *args, **kwargs):
        if OrderItem.objects.filter(event = kwargs['pk']).count() > 0:
             return Response({'error':'Event cannot be deleted'},status=status.HTTP_405_METHOD_NOT_ALLOWED)
        return super().destroy(request, *args, **kwargs)
    
    # used for search bar
    @action(detail=False, methods=['GET'])
    def search_events(self, request):
        event = request.query_params.get('searchText')
        category_names = request.query_params.get('categories')

        if (not event or event.isspace()) and (not category_names or all(x.isspace() for x in category_names.split(','))):
            return Response({'message': 'Please provide a query or category name for the search'}, status=status.HTTP_400_BAD_REQUEST)

        events = self.queryset

        if category_names:
            category_names = [x.strip() for x in category_names.split(',') if x and not x.isspace()]
            if category_names:
                # Retrieve the category IDs based on the category names
                category_ids = [get_object_or_404(Category, name=name).id for name in category_names]
                events = events.filter(category__id__in=category_ids)

        if event and not event.isspace():
            events = events.filter(title__icontains=event)

        if not events.exists():
            return Response({'message': 'No events found matching the search criteria'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        


class CartViewSet(CreateModelMixin,
                  RetrieveModelMixin,
                  DestroyModelMixin, GenericViewSet):
    queryset = Cart.objects.prefetch_related('items__event').all()
    serializer_class = CartSerializer
    
    def create(self, request, *args, **kwargs):
        # Assign the user ID to the cart
        user_id = request.user.id
        cart_data = request.data.copy()
        cart_data['id'] = user_id

        serializer = self.get_serializer(data=cart_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CartItemViewSet(ModelViewSet):
    http_method_names = ['get','post','patch','delete']
    def get_serializer_class(self): 
        if self.request.method == 'POST':
            return AddCartItemSerializer
        elif self.request.method == 'PATCH':
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_serializer_context(self):
        return{'cart_id':self.kwargs['cart_pk']}

    def get_queryset(self):
        return CartItem.objects.filter(cart_id = self.kwargs['cart_pk']).select_related('event')

class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    @action(detail=False,methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
         customer = Customer.objects.get(user_id=request.user.id)
         if request.method == 'GET': 
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
         elif request.method == 'PUT':
             serializer = CustomerSerializer(customer, data= request.data)
             serializer.is_valid(raise_exception=True)
             serializer.save()
             return Response(serializer.data)
    
    # to see all the orders
    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def history(self, request):
        customer = Customer.objects.get(user_id=request.user.id)
        orders = Order.objects.filter(customer=customer)
        serializer = OrderSerializer(orders, many=True)
        
        if not orders:
            return Response({'message': 'No orders available for this customer.'}, status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializer.data)
    
    # to register an user and/ a customer, we can have users that are not customers(staff)
    @action(detail=False, methods=['POST'])
    def register(self, request):
        if self.request.user.is_authenticated:
            # User is already authenticated
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            customer_data = {
                **request.data,
                'user': user.id,
                'first_name': request.data.get('first_name') ,
                'last_name': request.data.get('last_name') 
            }
            customer_serializer = CustomerSerializer(data=customer_data)
            customer_serializer.is_valid(raise_exception=True)
            customer = customer_serializer.save()
            return Response(customer_serializer.data, status=status.HTTP_201_CREATED)
        else:
            user_id = uuid.uuid4()  # Generate a random ID
            user_serializer = UserCreateSerializer(data={**request.data, 'id': user_id})
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()
            customer_data = {
                **request.data,
                'user': user.id,
                'first_name': request.data.get('first_name'),
                'last_name': request.data.get('last_name') 
            }
            customer_serializer = CustomerSerializer(data=customer_data)
            customer_serializer.is_valid(raise_exception=True)
            customer = customer_serializer.save()
            return Response(customer_serializer.data, status=status.HTTP_201_CREATED)

    # to create an event at a location in the database or to a new location
    @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
    @transaction.atomic
    def create_event(self, request):
        event_data = request.data
        location_data = event_data.pop('location', None)
        location_id = event_data.pop('location_id', None)

        if location_id:
            try:
                location = Location.objects.get(id=location_id)
            except Location.DoesNotExist:
                raise APIException(detail='Invalid location ID.', code=status.HTTP_400_BAD_REQUEST)
        elif location_data:
            location_data['id'] = str(uuid.uuid4()) 
            location_serializer = LocationSerializer(data=location_data)
            location_serializer.is_valid(raise_exception=True)
            location = location_serializer.create(location_serializer.validated_data)
        else:
            raise APIException(detail='Location details are required.', code=status.HTTP_400_BAD_REQUEST)

        try:
            customer = Customer.objects.get(user_id=request.user.id)
        except Customer.DoesNotExist:
            raise APIException(detail='No customer associated with the current user.', code=status.HTTP_404_NOT_FOUND)

        event_data['location'] = location.id
        event_serializer = EventSerializer(data=event_data)
        event_serializer.is_valid(raise_exception=True)
        event = event_serializer.create(event_serializer.validated_data)

        return Response({'message': 'Event created successfully.'}, status=status.HTTP_201_CREATED)

    
    
# we tried to have a sepate type of user to create events
# class EventCreatorViewSet(ModelViewSet):
#      queryset = EventCreator.objects.all()
#      serializer_class = EventCreatorSerializer

#      @action(detail=False,methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
#      def me(self, request):
#          customer = Customer.objects.get(user_id=request.user.id)
#          if request.method == 'GET': 
#             serializer = CustomerSerializer(customer)
#             return Response(serializer.data)
#          elif request.method == 'PUT':
#              serializer = CustomerSerializer(customer, data= request.data)
#              serializer.is_valid(raise_exception=True)
#              serializer.save()
#              return Response(serializer.data)
         
#      @action(detail=False, methods=['POST'], permission_classes=[IsAuthenticated])
#      def create_event(self, request):
#         event_data = request.data
#         location_data = event_data.pop('location', None)

#         customer = Customer.objects.get(user_id=request.user.id)
#         if location_data:
#             location_id = location_data.pop('id', None)
#             if location_id:
#                 location = Location.objects.get(id=location_id)
#                 Location.objects.filter(id=location_id).update(**location_data)
#             else:
#                 location = Location.objects.create(**location_data)
#         else:
#             location = None

#         event_data['creator'] = customer
#         event_data['location'] = location

#         serializer = EventSerializer(data=event_data)
#         serializer.is_valid(raise_exception=True)
#         event = serializer.save()

#         return Response({'message': 'Event created successfully.'}, status=status.HTTP_201_CREATED)
#      def list(self, request, *args, **kwargs):
#         return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

# depending on the request type we get, we can have different actions
class OrderViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data=request.data,
            context={'user_id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        elif self.request.method == 'PATCH':
            return UpdateOrderSerializer
        return OrderSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Order.objects.all()

        customer_id = Customer.objects.only(
            'id').get(user_id=user.id)
        return Order.objects.filter(customer_id=customer_id)
