# Generated by Django 4.2.3 on 2023-08-25 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='dishCategory',
            fields=[
                ('categoryID', models.IntegerField(primary_key=True, serialize=False)),
                ('categoryName', models.CharField(max_length=15)),
            ],
            options={
                'verbose_name': 'dishCategory',
            },
        ),
        migrations.CreateModel(
            name='FoodCart',
            fields=[
                ('cart_ID', models.IntegerField(primary_key=True, serialize=False)),
                ('totalBillAmount', models.IntegerField()),
            ],
            options={
                'verbose_name': 'foodCart',
            },
        ),
        migrations.CreateModel(
            name='table',
            fields=[
                ('tableID', models.IntegerField(primary_key=True, serialize=False)),
                ('capacity', models.IntegerField()),
                ('status', models.CharField(choices=[('available', 'AVAILABLE'), ('reserved', 'RESERVED'), ('occupied', 'OCCUPIED')], max_length=15)),
            ],
            options={
                'verbose_name': 'table',
            },
        ),
        migrations.CreateModel(
            name='restaurantMenu',
            fields=[
                ('dishID', models.IntegerField(primary_key=True, serialize=False)),
                ('dishName', models.CharField(max_length=30)),
                ('description', models.CharField(blank=True, default='Yummy!!', max_length=100, null=True)),
                ('quantity', models.IntegerField()),
                ('rate', models.IntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app1.dishcategory')),
            ],
            options={
                'verbose_name': 'restuarantMenu',
            },
        ),
        migrations.CreateModel(
            name='cartItems',
            fields=[
                ('dishID', models.IntegerField(primary_key=True, serialize=False)),
                ('dishName', models.CharField(max_length=30)),
                ('quantity', models.IntegerField(default=0)),
                ('itemCost', models.BigIntegerField(default=0)),
                ('totalItemCost', models.BigIntegerField(default=0)),
                ('cartID', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='app1.foodcart')),
            ],
            options={
                'verbose_name': 'cartItem',
                'unique_together': {('cartID', 'dishID')},
            },
        ),
    ]
