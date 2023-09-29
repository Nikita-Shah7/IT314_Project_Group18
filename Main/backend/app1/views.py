from django.shortcuts import render,redirect
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth.models import User,auth
import uuid
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import authenticate,login
from django.contrib.auth.decorators import login_required
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

def signup(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            if User.objects.filter(username = username).first():
                messages.success(request, 'Username is taken.')
                return redirect('/signup')

            if User.objects.filter(email = email).first():
                messages.success(request, 'Email is taken.')
                return redirect('/signup')
            
            user_obj = User(username = username , email = email)
            user_obj.set_password(password)
            user_obj.save()
            auth_token = str(uuid.uuid4())
            profile_obj = verify.objects.create(user = user_obj , auth_token = auth_token)
            profile_obj.save()
            send_mail_verify(email , auth_token)
            return redirect('/token_send')
        except Exception as e:
            print(e)
    return render(request , 'signup.html')
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

def send_mail_verify(email , token):
    subject = 'Your accounts need to be verified'
    message = f'Hi paste the link to verify your account http://127.0.0.1:8000/veri/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    auth_password = settings.EMAIL_HOST_PASSWORD
    send_mail(subject, message , email_from ,recipient_list, auth_password=auth_password )

def veri(request , auth_token):
    try:
        profile_obj = verify.objects.filter(auth_token = auth_token).first()
        if profile_obj:
            if profile_obj.is_verified:
                messages.success(request, 'Your account is already verified.')
                return redirect('/signin')
            profile_obj.is_verified = True
            profile_obj.save()
            messages.success(request, 'Your account has been verified.')
            return redirect('/signin')
        else:
            return redirect('/error')
    except Exception as e:
        print(e)
        return redirect('/')
def error(request):
    return  render(request , 'error.html')    
def token_send(request):
    return render(request,'token_send.html')

def success(request):
    return render(request,'success.html')