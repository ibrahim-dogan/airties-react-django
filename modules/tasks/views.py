from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView

index_view = never_cache(TemplateView.as_view(template_name='index_2.html'))

# class Tasks(View):
#     def get(self, request):
#         return render(request, 'index.html', {})
#
#     def post(self, request):
#         return HttpResponse()
