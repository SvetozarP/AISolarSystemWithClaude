"""
Views for the solar system app.
"""
from django.shortcuts import render


def index(request):
    """
    Main view for the solar system visualization.
    """
    context = {
        'title': 'Interactive Solar System',
        'description': 'Explore our solar system with interactive 3D visualization',
    }
    return render(request, 'solar_system/index.html', context)