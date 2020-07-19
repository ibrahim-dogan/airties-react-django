from django.urls import path, re_path

# from .views import Tasks
from modules.tasks.views import index_view

urlpatterns = [
    # path('', Tasks.as_view()),
    re_path(r'^.*$', index_view, name='index'),
]
