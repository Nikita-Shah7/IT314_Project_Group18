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
    path('api/order',views.Order.as_view()),
    path('api/foodcart',views.foodCart.as_view()),
    path('api/user',views.Users.as_view()),
    path('signup',views.signup,name='signup'),
    path('signin',views.signin,name='signin'),
    path('logout',views.logout,name='logout'),
    path('success',views.success,name='success'),
    path('token_send',views.token_send,name='token_send'),
    path('veri/<token>' , views.veri , name="veri"),
    path('forgot/<token>' , views.forgot , name="forgot"),
    path('error',views.error,name='error'),
    path('forget',views.forget,name='forget'),
    path('payment',views.payment,name='payment'),
    path('handlerequest',views.handlerequest,name='handlerequest'),
    path('<int:year>/<str:month>',views.index,name='index'),
]
