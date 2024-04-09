from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, permissions
from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth.models import User


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access this view
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'updated_at']
    filterset_fields = ['is_completed']
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend, filters.SearchFilter]

    def get_queryset(self):
        # Override the get_queryset method to filter tasks based on the logged-in user
        user = User.objects.get(username=self.request.user)
        return Task.objects.filter(user=user)

    def perform_create(self, serializer):
        # Override the perform_create method to save the logged-in user as the owner of a task when it's created
        serializer.save(user=self.request.user)
