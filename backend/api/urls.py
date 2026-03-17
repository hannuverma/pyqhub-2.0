import os

from django.contrib import admin
from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.getpapers, name = 'index'),
    path('getsubjects/', views.getSubjects, name = 'getsubjects')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
if os.environ.get("ENV") != "production":
    urlpatterns += [path('admin/', admin.site.urls)]