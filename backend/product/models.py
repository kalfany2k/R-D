from django.contrib import admin
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from uuid import uuid4
from datetime import datetime
from location.models import Location
from datetime import timedelta
from django.conf import settings
from django.contrib.auth.models import AbstractUser
#from store.validators import validate_file_size


class Category(models.Model):
    title = models.CharField(max_length=255)
    featured_event = models.ForeignKey(
        'Event', on_delete=models.SET_NULL, null=True, related_name='+')
    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']

# Music, Sports, Arts and Theatre, Workshops and Conferences, Food and Drinks, Health and Wellness, Charity and Fundraising, Comedy, Educational
class Event(models.Model):
    age_18 = 'A'
    age_underage = 'U'
    age_choice = [
        (age_18, '+18'),
        (age_underage, 'underage'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    inventory = models.IntegerField()
    last_update = models.DateTimeField(auto_now=True, null=True)
    category = models.ManyToManyField(Category, related_name='events')
    age_restriction = models.CharField(
        max_length=1, choices=age_choice, default=age_underage)
    start_date = models.DateTimeField(default=datetime(2023, 1, 1))
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='events')
    end_date = models.DateField(default=datetime(2023, 1, 2))
    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ['title']

class Customer(models.Model):
    
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
             ('view_history', 'Can view history')
        ]


class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]

    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.PROTECT, related_name='items')
    event = models.ForeignKey(
        Event, on_delete=models.PROTECT, related_name='orderevents')
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)


class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE)


class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)]
    )

    class Meta:
        unique_together = [['cart', 'event']]



class EventCreator(models.Model):
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)    

    def create_event(self, event_data):
        event = Event.objects.create(**event_data, creator=self)
        return event

