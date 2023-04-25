from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilesViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('files', FilesViewSet, basename='files')

urlpatterns = [
    path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
