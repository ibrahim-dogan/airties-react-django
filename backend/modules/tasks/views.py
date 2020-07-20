from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView

index_view = never_cache(TemplateView.as_view(template_name='index.html'))
