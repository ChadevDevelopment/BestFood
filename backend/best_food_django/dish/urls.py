from django.urls import path
from . import api

urlpatterns = [
    # Restaurant API URLs
    path('', api.dishes_list, name='api_dishes_list'),
        path('dish/<uuid:id>/', api.dish_detail, name='api_dish_detail'),  # Dish detay endpoint
    path('dish/create/', api.create_dish, name='api_create_dish'),     # Dish oluşturma endpoin
   
]
