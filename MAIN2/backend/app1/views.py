from django.shortcuts import render,redirect
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib import messages
from django.contrib.auth.models import User,auth
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
def signup(request):
    if request.method == 'POST':
        username= request.POST['username']
        email= request.POST['email']
        password= request.POST['password']
        password2= request.POST['repassword']
        if password == password2 :
            if User.objects.filter(email=email).exists():
                messages.info(request,'User already exits')
                return redirect('signup')
            elif User.objects.filter(username=username).exists():
                messages.info(request,'User already exits')
                return redirect('signup')
            else :
                user = User.objects.create_user(username=username,email=email,password=password)
                user.save()
                return redirect('signin')
        else :
            return redirect('signup')
    return render(request,'signup.html')
def signin(request):
    if request.method == 'POST':
        username= request.POST['username']
        password= request.POST['password']
        user = auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else :
            messages.info(request,'User Not exits')
            return redirect('signin')
    else :
        return render(request,'signin.html')
def logout(request):
    auth.logout(request)
    return redirect('/')
def index(request):
    return render(request,'index.html')