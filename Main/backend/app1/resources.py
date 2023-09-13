from import_export import resources
from .models import *


class RestaurantMenuResource(resources.ModelResource):
    class Meta:
        model = restaurantMenu
        fields = ('dishID', 'dishName', 'category', 'description', 'quantity', 'rate')  # Include all relevant fields
        import_id_fields = ['dishID']

