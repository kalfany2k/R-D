from django.urls import include, path
from rest_framework_nested import routers

from .views import LocationViewSet

# Create a router and register the LocationViewSet
router = routers.DefaultRouter()
router.register('locations', LocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


