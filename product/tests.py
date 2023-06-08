from datetime import date, datetime, time

from core.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from location.models import Location
from product.models import Category, Event
from product.serializers import EventSerializer

class CartTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

    def test_add_item_to_cart(self):
        # Create a location
        #event = Event.objects.get(title__exact = "Concert of Melodies")
        events = Event.objects.all()
        for event in events:
            print(event.title)
        if event is None:
            print("Event with ID 2 does not exist.")
            return

        # Serialize the event object
        event_serializer = EventSerializer(event)
        event_data = event_serializer.data

        response = self.client.post(reverse('products-detail-list'), data=event_data, format='json')
        print("passed1")
        print(response.data)
        print("passed2")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        event_id = response.data['id']
        
        # Add the event to the cart
        cart_item_data = {'event_id': event_id, 'quantity': 2}
        response = self.client.post(reverse('cart-items-list'), cart_item_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check if the item was added to the cart
        response = self.client.get(reverse('carts-detail'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['items']), 1)
        self.assertEqual(response.data['items'][0]['event_id'], event_id)
        self.assertEqual(response.data['items'][0]['quantity'], 2)
