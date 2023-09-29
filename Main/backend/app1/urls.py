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

    path('api/cartitems-update/<int:pk>/',views.CartItems.as_view()),
    path('api/cartitems-delete/<int:pk>/',views.CartItems.as_view()),
    path('',views.index,name='index'),
    path('signup',views.signup,name='signup'),
    path('signin',views.signin,name='signin'),
    path('logout',views.logout,name='logout'),
    path('success',views.success,name='success'),
    path('token_send',views.token_send,name='token_send'),
    path('veri/<auth_token>' , views.veri , name="veri"),
    path('error',views.error,name='error'),
    
]
