from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Dish
from .serializers import DishListSerializer

# RESTful API Endpoints
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def dishes_list(request):
    dishes = Dish.objects.all()
    serializer = DishListSerializer(dishes, many=True)
    
    return JsonResponse({
        'data':serializer.data
    })
    
    
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def dish_detail(request, id):
    try:
        dish = Dish.objects.get(id=id)
    except Dish.DoesNotExist:
        return JsonResponse({'error': 'Dish not found'}, status=404)
    
    serializer = DishSerializer(dish)
    return JsonResponse({'data': serializer.data})

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_dish(request):
    serializer = DishSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'data': serializer.data}, status=201)
    return JsonResponse({'error': serializer.errors}, status=400)
    