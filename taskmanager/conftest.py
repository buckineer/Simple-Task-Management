import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


# This fixture provides an instance of the APIClient. This client simulates GET, POST, etc.
# methods in a similar way to a regular client in a browser.
@pytest.fixture
def authenticated_client(test_user):
    refresh = RefreshToken.for_user(test_user)
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
    return client


# This fixture creates a test user in the database
@pytest.fixture
def test_user():
    return User.objects.create_user(username='tester', password='testpass')


# This fixture creates a test task in the database linked to the test user
@pytest.fixture
def test_task(test_user):
    from tasks.models import Task
    return Task.objects.create(user=test_user, title='Test Task', description='Test Description')


@pytest.fixture
def pagination_page_size():
    from django.conf import settings
    return settings.REST_FRAMEWORK['PAGE_SIZE']
