from django.urls import path
from .views import Tasks

urlpatterns = [
    path('', Tasks.as_view()),
]
