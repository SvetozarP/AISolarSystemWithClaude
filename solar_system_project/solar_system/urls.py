"""
URL configuration for solar_system app.
"""
from django.urls import path
from . import views

app_name = 'solar_system'

urlpatterns = [
    path('', views.index, name='index'),
]