from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response
from myapp.serializers import itemserializer
from myapp.models import item
from rest_framework.permissions import IsAuthenticated

class TestView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request,*args,**kwargs):
        qs = item.objects.all()
        serializer = itemserializer(qs,many=True)
        return Response(serializer.data) 
    
    def post(self,request,*args,**kwargs):
        serializer = itemserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        