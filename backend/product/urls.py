from django.urls import include, path
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('events', views.EventViewSet, basename='products-detail')
router.register('categories', views.CategoryViewSet)
router.register('carts', views.CartViewSet)
router.register('customers', views.CustomerViewSet)
router.register('orders', views.OrderViewSet, basename='orders')


carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')

event_creator_router = routers.DefaultRouter()
event_creator_router.register('event-creators', views.EventCreatorViewSet, basename='event-creators')

urlpatterns = router.urls + carts_router.urls + event_creator_router.urls

