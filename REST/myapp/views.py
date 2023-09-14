from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from django.contrib import messages
from django.http import HttpResponse
def index(request):
    return render(request,'index.html')
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
                user = User.objects.create(username=username,email=email,password=password)
                user.save
                return redirect('signin')
        else :
            return redirect('signup')
    return render(request,'signup.html')
def logout(request):
    auth.logout(request)
    return redirect('/')
