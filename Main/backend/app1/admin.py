from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from .resources import *


# Register your models here.
class RestaurantMenuAdmin(ImportExportModelAdmin):
    resource_class = RestaurantMenuResource

admin.site.register(restaurantMenu, RestaurantMenuAdmin)

admin.site.register(table)
admin.site.register(dishCategory)
admin.site.register(FoodCart)
admin.site.register(cartItems)