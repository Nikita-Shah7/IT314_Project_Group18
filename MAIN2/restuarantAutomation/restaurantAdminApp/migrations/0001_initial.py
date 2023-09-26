# Generated by Django 4.2.3 on 2023-08-09 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='dishCategory',
            fields=[
                ('categroyID', models.IntegerField(primary_key=True, serialize=False)),
                ('categoryName', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='restuarantMenu',
            fields=[
                ('dishID', models.IntegerField(primary_key=True, serialize=False)),
                ('dishName', models.CharField(max_length=20)),
                ('category', models.IntegerField()),
                ('quantity', models.IntegerField()),
                ('rate', models.IntegerField()),
                ('estTime', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('tableID', models.IntegerField(primary_key=True, serialize=False)),
                ('capacity', models.IntegerField()),
                ('status', models.CharField(max_length=15)),
            ],
        ),
    ]