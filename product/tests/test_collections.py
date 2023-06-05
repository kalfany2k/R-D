from product.models import Category, Event
from rest_framework import status
import pytest
from model_bakery import baker


@pytest.fixture
def create_Category(api_client):
    def do_create_Category(Category):
        return api_client.post('/store/Categorys/', Category)
    return do_create_Category


@pytest.mark.django_db
class TestCreateCategory:
    def test_if_user_is_anonymous_returns_401(self, create_Category):
        response = create_Category({'title': 'a'})

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_is_not_admin_returns_403(self, authenticate, create_Category):
        authenticate()

        response = create_Category({'title': 'a'})

        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
class TestRetrieveCategory:
    def test_if_Category_exists_returns_200(self, api_client):
        Category = baker.make(Category)

        response = api_client.get(f'/store/Categorys/{Category.id}/')

        assert response.status_code == status.HTTP_200_OK
        assert response.data == {
            'id': Category.id,
            'title': Category.title,
            'events_count': 0
        }