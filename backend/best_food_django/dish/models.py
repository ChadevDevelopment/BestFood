import uuid

from django.conf import settings
from django.db import models
from useraccount.models import User

class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Dish(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, default="defaultName")
    title = models.CharField(max_length=255)
    description = models.TextField()
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255) 
    favorited = models.ManyToManyField(User, related_name='favorite_restaurants', blank=True)
    image = models.ImageField(upload_to='uploads/dishes')
    owner = models.ForeignKey(User, related_name='owned_restaurants', on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    reviews = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, related_name='dishes', on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ingredients = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'

    def __str__(self):
        return self.name