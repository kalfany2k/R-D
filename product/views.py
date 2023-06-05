import random
import uuid
from core.models import User
from core.serializers import UserCreateSerializer, UserSerializer
from location.models import Location
from product.filters import EventFilter
from product.permissions import ViewCustomerHistory
from .models import Cart, CartItem, Customer, Event, EventCreator, Order, OrderItem
from django.shortcuts import render
from rest_framework.response import Response
from django.db.models.aggregates import Count
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from product.models import Category
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin
from rest_framework import status
from product.serializers import AddCartItemSerializer, CartItemSerializer, CartSerializer, CategorySerializer, CreateOrderSerializer, CustomerSerializer, EventCreatorSerializer, EventSerializer, OrderSerializer, RegistrationSerializer, UpdateCartItemSerializer, UpdateOrderSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
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


class CartViewSet(CreateModelMixin,
                  RetrieveModelMixin,
                  DestroyModelMixin, GenericViewSet):
    queryset = Cart.objects.prefetch_related('items__event').all()
    serializer_class = CartSerializer


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
    
    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def history(self, request):
        customer = Customer.objects.get(user_id=request.user.id)
        orders = Order.objects.filter(customer=customer)
        serializer = OrderSerializer(orders, many=True)
        
        if not orders:
            return Response({'message': 'No orders available for this customer.'}, status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializer.data)
    
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
                'first_name': request.data.get('first_name') or request.data.get('username'),
                'last_name': request.data.get('last_name') or request.data.get('username')
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
                'first_name': request.data.get('first_name') or request.data.get('username'),
                'last_name': request.data.get('last_name') or request.data.get('username')
            }
            customer_serializer = CustomerSerializer(data=customer_data)
            customer_serializer.is_valid(raise_exception=True)
            customer = customer_serializer.save()
            return Response(customer_serializer.data, status=status.HTTP_201_CREATED)


    @action(detail=False, methods=['POST'])#, permission_classes=[IsAuthenticated])
    def create_event(self, request):
        event_data = request.data
        location_data = event_data.pop('location', None)

        customer = Customer.objects.get(user_id=request.user.id)
        if location_data:
            location_id = location_data.pop('id', None)
            if location_id:
                location = Location.objects.get(id=location_id)
                Location.objects.filter(id=location_id).update(**location_data)
            else:
                location = Location.objects.create(**location_data)
        else:
            location = None

        event_data['creator'] = customer
        event_data['location'] = location

        serializer = EventSerializer(data=event_data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save()
        return Response({'message': 'Event created successfully.'}, status=status.HTTP_201_CREATED)

    
    

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
