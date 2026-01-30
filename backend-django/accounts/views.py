from django.shortcuts import render
from .serializers import userserializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
# Create your views here.
class registerview(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userserializer
    permission_classes = [AllowAny]   # this view can be excessed by anyone 