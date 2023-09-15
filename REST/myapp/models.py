from django.db import models

class item(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    def __str__(self):
        return self.title
