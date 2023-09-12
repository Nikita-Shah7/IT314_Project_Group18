# Generated by Django 4.2.3 on 2023-08-09 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_cart_remove_customer_cartid_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='finalOrderDetails',
            fields=[
                ('tableID', models.IntegerField(primary_key=True, serialize=False)),
                ('orderGivenTime', models.TimeField(auto_now_add=True)),
                ('orderStatus', models.CharField(choices=[('notordered', 'NOT ORDERED'), ('preparing', 'PREPARING'), ('recieved', 'RECIEVED')], max_length=15)),
                ('totalBill', models.IntegerField()),
                ('paymentStatus', models.CharField(choices=[('pending', 'PENDING'), ('recieved', 'RECIEVED')], max_length=15)),
            ],
            options={
                'verbose_name': 'finalOrderDetails',
            },
        ),
        migrations.AlterModelOptions(
            name='cart',
            options={'verbose_name': 'cart'},
        ),
        migrations.AlterModelOptions(
            name='customer',
            options={'verbose_name': 'customer'},
        ),
    ]
