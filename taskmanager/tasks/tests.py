import json

import pytest
from django.urls import reverse
from model_bakery import baker

from utils import is_subset_dict
from .models import Task
from .serializers import TaskSerializer
pytestmark = pytest.mark.django_db


class TestTaskAPI:
    endpoint = reverse("tasks-list")

    def test_list(self, authenticated_client, test_user):
        baker.make(Task, user=test_user, _quantity=3)

        response = authenticated_client.get(
            self.endpoint
        )
        assert response.status_code == 200
        assert len(json.loads(response.content)['results']) == 3

    def test_create(self, authenticated_client, test_user):
        task = baker.prepare(Task, user=test_user)

        expected_json = {
            'user': test_user.pk,
            'title': task.title,
            'description': task.description,
        }

        response = authenticated_client.post(
            self.endpoint,
            data=expected_json,
            format='json'
        )

        assert response.status_code == 201
        print(json.loads(response.content), expected_json)
        assert is_subset_dict(json.loads(response.content), expected_json)

    def test_retrieve(self, authenticated_client, test_user):
        task = baker.make(Task, user=test_user)
        expected_json = {
            'user': test_user.pk,
            'title': task.title,
            'description': task.description,
        }
        url = f'{self.endpoint}{task.id}/'

        response = authenticated_client.get(url)

        assert response.status_code == 200
        assert is_subset_dict(json.loads(response.content), expected_json)

    def test_update(self, authenticated_client, test_user):
        old_task = baker.make(Task, user=test_user)
        new_task = baker.prepare(Task, user=test_user)
        task_dict = {
            'user': test_user.pk,
            'title': new_task.title,
            'description': new_task.description,
        }

        url = f'{self.endpoint}{old_task.id}/'

        response = authenticated_client.put(
            url,
            task_dict,
            format='json'
        )

        assert response.status_code == 200
        assert is_subset_dict(json.loads(response.content), task_dict)

    @pytest.mark.parametrize('field', ['title', 'description'])
    def test_partial_update(self, field, authenticated_client, test_user):
        task = baker.make(Task, user=test_user)
        task_dict = {
            'title': task.title,
            'description': task.description
        }
        valid_field = task_dict[field]
        url = f'{self.endpoint}{task.id}/'

        response = authenticated_client.patch(
            url,
            {field: valid_field},
            format='json'
        )

        assert response.status_code == 200
        assert json.loads(response.content)[field] == valid_field

    def test_delete(self, authenticated_client, test_user):
        task = baker.make(Task, user=test_user)
        url = f'{self.endpoint}{task.id}/'

        response = authenticated_client.delete(url)

        assert response.status_code == 204
        assert Task.objects.all().count() == 0

    def test_pagination(self, authenticated_client, test_user, pagination_page_size):
        baker.make(Task, user=test_user, _quantity=pagination_page_size * 2)
        response = authenticated_client.get(
            self.endpoint
        )
        assert response.status_code == 200
        response_data = json.loads(response.content)
        assert response_data['count'] == pagination_page_size * 2
        assert len(response_data['results']) == pagination_page_size

    def test_complex_filtering(self, authenticated_client, test_user):
        baker.make(Task, user=test_user, title="T-Shirts")
        baker.make(Task, user=test_user, title="Jeans")
        baker.make(Task, user=test_user, title="Dresses")
        baker.make(Task, user=test_user, title="Sweaters")
        baker.make(Task, user=test_user, title="Running Shoes")
        baker.make(Task, user=test_user, title="Oxford Shoes")
        baker.make(Task, user=test_user, title="Athletic Shoes")
        baker.make(Task, user=test_user, title="Boat Shoes")
        baker.make(Task, user=test_user, title="Socks")
        baker.make(Task, user=test_user, title="Jackets")
        response = authenticated_client.get(
            f'{self.endpoint}?search=shoes&ordering=title'
        )
        assert response.status_code == 200
        response_data = json.loads(response.content)
        assert response_data['count'] == 4
        assert response_data['results'][0]['title'] == "Athletic Shoes"

    def test_task_list_unauthenticated(self, authenticated_client):
        # Clear the credentials set in the api_client fixture
        authenticated_client.credentials()

        response = authenticated_client.get(self.endpoint)

        # The view should return a 401 status code for unauthenticated requests
        assert response.status_code == 401
