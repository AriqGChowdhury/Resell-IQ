from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class PreviousResellsBids(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.AutoField(primary_key=True)
    year = models.IntegerField()
    brand = models.CharField(max_length=70)
    model_type = models.CharField(max_length=100)
    ram = models.IntegerField(default=0)
    storage = models.IntegerField(default=0)
    cpu = models.CharField(max_length=50)
    cpu_model = models.CharField(max_length=25, default="M1")
    cpu_tier = models.CharField(max_length=25, default="M1")
    screen_size = models.FloatField(default=0)
    condition = models.CharField(max_length=40)
    conditionID = models.IntegerField(default=2000)
    electronic_type = models.CharField(max_length=50)
    generated_bid = models.FloatField(null=True, blank=True)
    generated_resell = models.FloatField(null=True, blank=True)


    

