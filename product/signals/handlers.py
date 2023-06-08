from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from product.models import Cart, Customer
from django.contrib.auth.signals import user_logged_in, user_logged_out

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_customer_for_new_user(sender, **kwargs): 
  if kwargs['created']:
    Customer.objects.create(user=kwargs['instance'])


@receiver(user_logged_in)
def create_cart_on_login(sender, request, user, **kwargs):
    if hasattr(user, 'customer'):
        if not user.customer.carts.exists():
            Cart.objects.create(customer=user.customer)

@receiver(user_logged_out)
def delete_cart_on_logout(sender, user, request, **kwargs):
    if hasattr(user, 'customer') and hasattr(user.customer, 'carts'):
        user.customer.carts.all().delete()

# Connect the receiver function to the user_logged_in signal
user_logged_in.connect(create_cart_on_login)
user_logged_out.connect(delete_cart_on_logout)