from django.shortcuts import render
from .models import Files
from rest_framework import viewsets, permissions
from .serializers import FileSerializer

# Create your views here.


class FilesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Files.objects.all()
    serializer_class = FileSerializer
