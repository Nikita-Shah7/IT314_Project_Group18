from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/dishCategorys',views.DishCategorys.as_view()),
    path('api/restaurantMenus',views.RestaurantMenus.as_view())
]
