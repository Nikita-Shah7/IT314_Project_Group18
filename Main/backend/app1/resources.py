from import_export import resources
from .models import *


class DishCategoryResource(resources.ModelResource):
    class Meta:
        model = dishCategory
        fields = ('categoryID', 'categoryName')  # Include all relevant fields
        import_id_fields = ['categoryID']


class RestaurantMenuResource(resources.ModelResource):
    class Meta:
        model = restaurantMenu
        fields = ('dishID', 'dishName', 'category', 'description', 'quantity', 'rate')  # Include all relevant fields
        import_id_fields = ['dishID']


class TableResource(resources.ModelResource):
    class Meta:
        model = table
        fields = ('tableIID', 'capacity', 'status')   # Include all relevant fields
        import_id_fields = ['tableID']


class FoodCartResource(resources.ModelResource):
    class Meta:
        model = FoodCart
        fields = ('cartID', 'totalBillAmount')
        import_id_fields = ['cartID']

class orderResource(resources.ModelResource):
    class Meta:
        model = order
        fields = ('user', 'total_amount','payment_status','order_id','datetime_of_payment','razorpay_order_id','razorpay_payment_id','razorpay_signature')
        import_id_fields = ['orderid']
