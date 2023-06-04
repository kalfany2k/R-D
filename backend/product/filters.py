from django_filters.rest_framework import FilterSet
from .models import Event

class EventFilter(FilterSet):
    class Meta:
        model = Event
        fields = {
            'id' : ['exact'],
            'price' : ['gt', 'lt'],
            'category__title': ['exact'],
        }