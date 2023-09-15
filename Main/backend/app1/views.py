from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
# a convention followed(except in case of foodCart)::
# model names start with lower case
# view-class name start with upper case

# Create your views here.
class DishCategorys(APIView):
    def get(self,request):
        allItems = dishCategory.objects.all()
        toJson = dishCategorySerializer(allItems,many=True)
        return Response(toJson.data)

    def post(self,request):
        # Deserialize the data from the request's body using the serializer
        serializer = dishCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class RestaurantMenus(APIView):
    def get(self,request):
        allItems = restaurantMenu.objects.all()
        toJson = restaurantMenuSerializer(allItems,many=True)
        return Response(toJson.data)

    def post(self,request):
        # Deserialize the data from the request's body using the serializer
        serializer = restaurantMenuSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class Table(APIView):
    def get(self,request):
        allItems = table.objects.all()
        toJson = tableSerializer(allItems,many=True)
        return Response(toJson.data)

    def post(self,request):
        # Deserialize the data from the request's body using the serializer
        serializer = tableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        