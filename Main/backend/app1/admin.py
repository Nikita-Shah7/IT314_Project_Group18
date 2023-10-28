from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin
from .resources import *


# Register your models here.
class DishCategoryAdmin(ImportExportModelAdmin):
    resource_class = DishCategoryResource

admin.site.register(dishCategory, DishCategoryAdmin)


class RestaurantMenuAdmin(ImportExportModelAdmin):
    resource_class = RestaurantMenuResource

admin.site.register(restaurantMenu, RestaurantMenuAdmin)


class TableAdmin(ImportExportModelAdmin):
    resource_class = TableResource

admin.site.register(table, TableAdmin)


class FoodCartAdmin(ImportExportModelAdmin):
    resource_class = FoodCartResource

admin.site.register(FoodCart, FoodCartAdmin)

admin.site.register(verify)

class orderAdmin(ImportExportModelAdmin):
    resource_class = order

admin.site.register(order, orderAdmin)


# admin.site.register(table)
# admin.site.register(dishCategory)
# admin.site.register(FoodCart)
# admin.site.register(cartItems)