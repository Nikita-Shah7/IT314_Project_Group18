from django.shortcuts import render,redirect
from rest_framework import status
from rest_framework.views import APIView
from .models import *
from django.http import HttpResponse
from .serializers import *
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.response import Response
from django.contrib.auth.models import User,auth
import uuid
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import authenticate,login
from django.contrib.auth.decorators import login_required
import calendar
from calendar import HTMLCalendar
# a convention followed(except in case of foodCart)::
# model names start with lower case
# view-class name start with upper case
# Create your views here.

def index(request,year,month):
    month = month.capitalize()
    month_num = list(calendar.month_name).index(month)
    month_num = int(month_num)
    cal = HTMLCalendar().formatmonth(year,month_num)
    return render(request,'index.html',{"year":year,"month":month_num,"cal":cal})
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
        
class Order(APIView):
    def get(self,request,*args,**kwrags):
        allItems = order.objects.all()
        toJson = orderSerializer(allItems,many=True)
        return Response(toJson.data)

    def post(self,request):
        serializer = orderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 

class Users(APIView):
    def get(self,request,*args,**kwrags):
        allItems = User.objects.all()
        is_superuser = self.request.query_params.get('is_superuser',None)
        if is_superuser:
            allItems = allItems.filter(is_superuser=is_superuser)
        toJson = userSerializer(allItems,many=True)
        return Response(toJson.data)

    def post(self,request):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 

class RestaurantMenus(APIView):
    def get(self,request):
        allItems = restaurantMenu.objects.all()
        dishID = self.request.query_params.get('dishID',None)
        if dishID:
            allItems = allItems.filter(dishID=dishID)
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

def send_mail_verify(email , token):
    subject = 'Your accounts need to be verified'
    message = f'Hi paste the link to verify your account http://127.0.0.1:8000/veri/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    auth_password = settings.EMAIL_HOST_PASSWORD
    send_mail(subject, message , email_from ,recipient_list, auth_password=auth_password )
def send_mail_forget(email , token):
    subject = 'Forgot Your password'
    message = f'Hi paste the link and rest your password http://127.0.0.1:8000/forgot/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    auth_password = settings.EMAIL_HOST_PASSWORD
    send_mail(subject, message , email_from ,recipient_list, auth_password=auth_password )

def forgot(request , token):
    context = {}
    try:
        profile_obj = verify.objects.filter(auth_token = token).first()
        context = {'userid':profile_obj.user.id}
        if request.method == 'POST' :
            password= request.POST['password']
            password2= request.POST['password2']
            user_id = request.POST['user_id']
            if user_id is None :
                messages.success(request,'User Not found')
                return redirect(f'/forgot/{token}')
            if password != password2 :
                messages.success(request,'Password Not same')
                return redirect(f'/forgot/{token}') 
            user_object = User.objects.get(id=user_id)
            user_object.set_password(password)
            user_object.save()
            messages.success(request,'Password has been reset successfully')
            return redirect('/signin')
    except Exception as e:
        print(e)
    return render(request,'forgot.html',context)
def veri(request , token):
    try:
        profile_obj = verify.objects.filter(auth_token = token).first()
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

def forget(request):
    if request.method == 'POST':
        username= request.POST['username']
        email= request.POST['email']
        if User.objects.filter(username=username,email=email).exists():
            user = User.objects.get(username=username,email=email)
            verif = verify.objects.get(user=user)
            if verif.is_verified == True :
                send_mail_forget(email,verif.auth_token)
                return render(request,'token_send.html')
            else :
                print(verif.auth_token)
                send_mail_verify(email,verif.auth_token)
                messages.success(request,'Email Not been verified adn link has been sent')
                return redirect('/forget')
        else :
            messages.success(request,'Email or User is Invalid')
            return redirect('/forget')
    else :
        return render(request,'forget.html')
import razorpay
razorpay_client = razorpay.Client(auth=(settings.R_ID, settings.R_C_ID))
@login_required
def payment(request):
    amount = 100
    orders = order.objects.create(user=request.user,total_amount=amount)
    orders.save()
    order_currency = 'INR'
    callback_url = 'http://'+ str(get_current_site(request))+"/handlerequest"
    print (callback_url)
    notes = {'order-type': "basic order from the website"}
    razorpay_order = razorpay_client.order.create(dict(amount=amount*100,currency=order_currency,notes = notes, receipt=orders.order_id, payment_capture='0'))
    print (razorpay_order['id'])
    orders.razorpay_order_id = razorpay_order['id']
    orders.save()
    return render(request,'payment.html', {'order' :orders,'order_id':razorpay_order['id'],'orderId' : orders.order_id, 'final_price':amount, 'razorpay_merchant_id':settings.R_ID,'callback_url' :callback_url})
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt   
def handlerequest(request):
    return  render(request , 'suc.html') 
    
