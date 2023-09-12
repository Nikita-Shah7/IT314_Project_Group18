import sys
sys.path.append(r"D:\Projects\Django\Restuarant_Automation\restuarantAutomation\packages")


from django.db import models
import uuid
from restaurantAdminApp.models import table
# from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class customer(models.Model):
    class Meta:
        verbose_name = "customer"
    # customerID = models.IntegerField(primary_key=True)
    customerName = models.CharField(max_length=20)
    noOfMembers = models.IntegerField()
    # contact_no = PhoneNumberField()
    email = models.EmailField(max_length=30)
            # Setting unique=True on a ForeignKey has the same effect as using a OneToOneField.
            # HINT: ForeignKey(unique=True) is usually better served by a OneToOneField.
    # tableID = models.ForeignKey(table,on_delete=models.CASCADE,primary_key=True)
    tableID = models.OneToOneField(table,unique=True,on_delete=models.CASCADE,primary_key=True)
    # cartID = models.IntegerField()
    entryTime = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.customerName
    
    # def save(self, *args, **kwargs):
        # Set field2 to the same value as field1 before saving
        # self.customerID = self.tableID
        # self.cartID = self.tableID
        # super(customer, self).save(*args, **kwargs)


class cart(models.Model):
    class Meta:
        verbose_name = "cart"
    cartID = models.IntegerField(primary_key=True)  # will be equal to tableID
    # inCart = models.JSONField()
    dishes = models.CharField(max_length=20)
    quantityOrdered = models.IntegerField()
    totalAmountPerDish = models.IntegerField()
    

class finalOrderDetails(models.Model):
    orderStatus = [ 
        ('notordered','NOT ORDERED'),
        ('preparing','PREPARING'),
        ('recieved','RECIEVED'),
    ]
    paymentStatus = [
        ('pending','PENDING'),
        ('recieved','RECIEVED'),
    ]
    class Meta:
        verbose_name = "finalOrderDetails"
    tableID = models.OneToOneField(table,unique=True,on_delete=models.CASCADE,primary_key=True)
    orderGivenTime = models.TimeField(auto_now_add=True)
    orderStatus = models.CharField(max_length=15,choices=orderStatus,default='NOT ORDERED')
    totalBill = models.IntegerField(default=0)
    paymentStatus = models.CharField(max_length=15,choices=paymentStatus)


# @receiver(post_save, sender=cart)
# def update_total_bill_amount(sender,instance, **kwargs):
#     final = instance.finalOrderDetails
#     total_bill = 0
#     dishes = final.objects.filter(cartID=)
#     for item in dishes:
#         total_bill += item.quantityOrdered*item.totalAmountPerDish
    
    



# tableID = custID = cartID
