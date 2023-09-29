from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class restaurantMenu(models.Model):
    class Meta:
        verbose_name = "restuarantMenu"
    dishID = models.IntegerField(primary_key=True)
    dishName = models.CharField(max_length=30)
    # img = models.ImageField(upload_to='menuItems/',blank=True,null=False)
    category = models.ForeignKey("dishCategory",on_delete=models.CASCADE)  # categoryID will be taken from category table
    description = models.CharField(max_length=100,blank=True,null=True,default="Yummy!!")
    quantity = models.IntegerField()   # in grams
    rate = models.IntegerField()
    # estTime = models.IntegerField()  # estimated time in minutes

    def __str__(self):
        return self.dishName


class table(models.Model):
    TABLE_AVAILABILITY_STATUS = [  # -> (value stored in DB, human readable value)
        ('available','AVAILABLE'),
        ('reserved','RESERVED'),
        ('occupied','OCCUPIED'),
    ]

    class Meta:
        verbose_name = "table"
    tableID = models.IntegerField(primary_key=True)
    capacity = models.IntegerField()
    status = models.CharField(max_length=15, choices=TABLE_AVAILABILITY_STATUS)

    def __str__(self):
        return str(self.tableID)
    

class dishCategory(models.Model):
    class Meta:
        verbose_name = "dishCategory"
    categoryID = models.IntegerField(primary_key=True)
    categoryName = models.CharField(max_length=15)

    def __str__(self):
        return self.categoryName
    

class FoodCart(models.Model):
    class Meta:
        verbose_name = "FoodCart"
    cartID = models.IntegerField(primary_key=True)
    totalBillAmount = models.IntegerField()

    def __str__(self):
        return str(self.cartID)
class verify(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    auth_token = models.CharField(max_length=100)
    is_verified = models.BooleanField(default=False) 
    def __str__(self) :
        return self.user.username