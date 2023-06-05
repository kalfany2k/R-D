from location.models import Location
from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from product.models import Event
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'first_name', 'last_name'),
        }),
    )


class LocationInline(GenericTabularInline):
    model = Location


class CustomEventAdmin(admin.ModelAdmin):
    inlines = [LocationInline]
    search_fields = ['title', 'description']

admin.site.unregister(Event)
admin.site.register(Event, CustomEventAdmin)
