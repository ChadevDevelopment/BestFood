from rest_framework import serializers
from .models import Dish, Category

class DishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['id','name', 'title', 'description', 'address', 'city', 'country', 'image_url']
        

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']