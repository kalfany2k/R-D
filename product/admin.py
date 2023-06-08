from typing import Any, List, Optional, Tuple
from django.contrib import admin,  messages
from django.db.models.query import QuerySet
from django.db.models import Count
from django.urls import reverse
from django.http.request import HttpRequest
from django.utils.html import format_html
from django.utils.http import urlencode

from . import models



# Register your models here.

class InventoryFilter(admin.SimpleListFilter):
    title = 'inventory'
    parameter_name = 'inventory'

    def lookups(self, request, model_admin):
        return [
            ('<10', 'Low')
        ]

    def queryset(self, request, queryset: QuerySet):
        if self.value() == '<10':
            return queryset.filter(inventory__lt=10)


@admin.register(models.Event)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title','location', 'price','get_categories', 'inventory_status']
    list_editable = ['price']
    list_per_page = 30
    search_fields = ['title']
    list_filter = ['category', 'last_update', InventoryFilter]

    def get_categories(self, obj):
        return ", ".join([category.title for category in obj.category.all()])
    get_categories.short_description = 'Categories'

    @admin.display(ordering='inventory')
    def inventory_status(self, product):
        if product.inventory < 100:
            return 'Low'
        return 'OK'

    @admin.action(description='Clear inventory')
    def clear_inventory(self, request, queryset):
        updated_count = queryset.update(inventory=0)
        self.message_user(
            request,
            f'{updated_count} products were successfully updated.',
            messages.ERROR
        )
    
@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'orders']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__first_name','user__last_name']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']


    @admin.display(ordering='orders_count')
    def orders(self, customer):
        url = (
            reverse('admin:product_order_changelist')
            + '?'
            + urlencode({
                'customer__id': str(customer.id)
            }))
        return format_html('<a href="{}">{} Orders</a>', url, customer.orders_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    
    list_display = ['title', 'events_count']
    search_fields = ['title']
    verbose_name_plural = 'Categories'

    @admin.display(ordering='events_count')
    def events_count(self, category):
        url = (
            reverse('admin:product_event_changelist')
            + '?'
            + urlencode({
                'category__id': str(category.id)
            }))
        return format_html('<a href="{}">{} Events</a>', url, category.events_count)


    def get_queryset(self, request: HttpRequest) -> QuerySet[Any]:
        return super().get_queryset(request).annotate(
            events_count = Count('events')
        )
    class Meta:
         verbose_name = 'category'
         verbose_name_plural = 'Categories'


class OrderItemInline(admin.TabularInline):
    model = models.OrderItem
    autocomplete_fields = ['event']


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    autocomplete_fields = ['customer']
    inlines = [OrderItemInline] 
    list_display = ['id', 'placed_at', 'customer']
   

class CartItemInline(admin.TabularInline):
    model = models.CartItem
    autocomplete_fields = ['event']


@admin.register(models.Cart)
class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemInline] 
    list_display = ['id']
   
