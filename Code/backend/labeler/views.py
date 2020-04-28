from django.template.defaulttags import csrf_token
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User

import pdb
# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer, ImageSerializer, ImageSetSerializer      # add this
from .models import Todo, Image, ImageSet                # add this
from rest_framework.decorators import action

class TodoView(viewsets.ModelViewSet):       # add this
    serializer_class = TodoSerializer          # add this
    queryset = Todo.objects.all()              # add this

class ImageSetView(viewsets.ModelViewSet):
    serializer_class = ImageSetSerializer
    queryset = ImageSet.objects.all()

    @action(methods=['post'], detail=False)
    def create_image_set(self, request):

        '''
        request.data structure:
        {'name':'xxx', 'owner':'xxx', 'possible_labels':['xxx]}
        '''

        owner = UserS

        image_set = ImageSet(name = request.data['name'], owner = 0, possible_labels = request.data['possible_labels'])

        return JsonResponse(ImageSetSerializer(image_set).data)

        

        # Set owner
        # Set image set name
        # Set possible labels


class ImageView(viewsets.ModelViewSet):       # add this
    serializer_class = ImageSerializer          # add this
    queryset = Image.objects.all()              # add this
    
    @action(methods=['get'], detail=False)
    def get_unlabeled_image(self, request):
        # pdb.set_trace()
        q = Image.objects.filter(picked_label = "").filter(is_sent = False)
        image = q.first()
        image.is_sent = True
        image.save()
        return JsonResponse(ImageSerializer(image).data)
    
    @action(methods=['post'], detail=False)
    def label_image(self, request):
        '''
        request.data structure:
        {'image_id':'xxx', 'label':'xxx'}
        '''
        image_id = request.data.get('image_id')
        label = request.data.get('label')
        if not image_id or not label:
            return JsonResponse({'status': False, 'message': "Invalid paramaters"}, status=500)
        image = Image.objects.filter(id=image_id).first()
        if not image:
            return JsonResponse({'status': False, 'message': "Couldn't find id"}, status=500)
        image.label = request.data['label']
        if label  in image.possible_labels:
            image.picked_label = request.data['label']
            image.save()
            return JsonResponse({'status': True, 'message': "Success"})
            
        return JsonResponse({'status': False, 'message': "Invalid label"}, status=500)