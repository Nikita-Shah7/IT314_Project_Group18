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
    path('',views.index,name='index'),
    path('signup',views.signup,name='signup'),
    path('signin',views.signin,name='signin'),
    path('logout',views.logout,name='logout'),
    # path('api/cartitems',views.CartItems.as_view()),
]
