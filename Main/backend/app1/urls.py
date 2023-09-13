from django.contrib import admin
from django.urls import path
from . import views
# a convention followed(except in case of foodCart)::
# model names start with lower case
# view-class name start with upper case

urlpatterns = [
    path('api/dishcategory',views.DishCategorys.as_view()),
    path('api/restaurantmenu',views.RestaurantMenus.as_view()),
    path('api/table',views.Table.as_view()),
    path('api/foodcart',views.foodCart.as_view()),
    path('api/cartitems',views.CartItems.as_view()),
]
