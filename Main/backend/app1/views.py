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
        

class foodCart(APIView):
    def get(self,request):
        allItems = FoodCart.objects.all()
        toJson = FoodCartSerializer(allItems,many=True)
        return Response(toJson.data)

    def post(self,request):
        # Deserialize the data from the request's body using the serializer
        serializer = FoodCartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class CartItems(APIView):
    def get(self,request,pk=None):
        if pk is None:
            allItems = cartItems.objects.all()
            toJson = cartItemsSerializer(allItems,many=True)
            return Response(toJson.data)
        else:
            try:
                item = cartItems.objects.get(pk=pk)
                serializer = cartItemsSerializer(item)
                return Response(serializer.data)
            except cartItems.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self,request):
        # Deserialize the data from the request's body using the serializer
        serializer = cartItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def put(self,request,pk):
        try:
            itemToBeUpdated = cartItems.objects.get(pk=pk)
            serializer = cartItemsSerializer(itemToBeUpdated, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)    # status=status.HTTP....
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            raise status.HTTP_404_NOT_FOUND
        
    def delete(self,request,pk):
        try:
            itemToBeDeleted = cartItems.objects.get(pk=pk)
            itemToBeDeleted.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

