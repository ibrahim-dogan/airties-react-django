from django.http import HttpResponse
from django.shortcuts import render
from django.views import View


class Tasks(View):
    def get(self, request):
        return render(request, 'index.html', {})

    def post(self, request):
        return HttpResponse()
