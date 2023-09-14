from rest_framework import serializers
from .models import *
class itemserializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields = ['title','price','description']