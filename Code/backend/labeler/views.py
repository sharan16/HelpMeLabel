from django.template.defaulttags import csrf_token
from django.shortcuts import render
from django.http import JsonResponse

import pdb
# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer, ImageSerializer      # add this
from .models import Todo, Image                   # add this
from rest_framework.decorators import action

class TodoView(viewsets.ModelViewSet):       # add this
    serializer_class = TodoSerializer          # add this
    queryset = Todo.objects.all()              # add this

class ImageView(viewsets.ModelViewSet):       # add this
    serializer_class = ImageSerializer          # add this
    queryset = Image.objects.all()              # add this
    
    @action(methods=['get'], detail=False)
    def get_unlabeled_image(self,request):
        q = Image.objects.filter(picked_label = "").filter(is_sent = False)
        image = q.first()
        image.is_sent = True
        image.save()
        return JsonResponse(ImageSerializer(image).data)
    

