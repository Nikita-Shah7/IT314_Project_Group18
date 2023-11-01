from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
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

class userSerializer(serializers.ModelSerializer):
    # Model Meta is basically the inner class of your model class.
    class Meta:
        model = User
        fields = ['first_name','last_name','username','email','is_active','is_superuser','date_joined','last_login']

class tableSerializer(serializers.ModelSerializer):
    # Model Meta is basically the inner class of your model class.
    class Meta:
        model = table
        fields = ['tableID','capacity','status']
        # fields = '__all__'


class FoodCartSerializer(serializers.ModelSerializer):
    # Model Meta is basically the inner class of your model class.
    class Meta:
        model = FoodCart
        fields = ['cartID','totalBillAmount']
        # fields = '__all__'

class orderSerializer(serializers.ModelSerializer):
    # Model Meta is basically the inner class of your model class.
    class Meta:
        model = order
        fields = '__all__'
        # fields = '__all__'