from rest_framework import serializers
from .models import *

class dishCategorySerializer(serializers.ModelSerializer):
    # Model Meta is basically the inner class of your model class.
    class Meta:
        model = dishCategory
        fields = ['categoryID','categoryName']
        # fields = '__all__'


class restaurantMenuSerializer(serializers.ModelSerializer):
    # Model Meta is basically the inner class of your model class.
    class Meta:
        model = restaurantMenu
        fields = ['dishID','dishName','category','description','quantity','rate']
        # fields = '__all__'