from django.template.defaulttags import csrf_token
from django.shortcuts import render
from django.http import JsonResponse

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
        {'name':'xxx', 'possible_labels':['xxx']}
        '''

        if not request.user.is_authenticated:
            return JsonResponse({'status': False, 'message': "Invalid user authentication."}, status=401)

        image_set_name = request.data.get('name')
        possible_labels = request.data.get('possible_labels')

        if not image_set_name or not possible_labels:
            return JsonResponse({'status': False, 'message': "Invalid parameters"}, status=500)

        image_set = ImageSet(name = str(image_set_name), user = request.user, possible_labels = request.data['possible_labels'])
        image_set.save()

        return JsonResponse(ImageSetSerializer(image_set).data)

class ImageView(viewsets.ModelViewSet):       # add this
    serializer_class = ImageSerializer          # add this
    queryset = Image.objects.all()              # add this
    
    @action(methods=['get'], detail=False)
    def get_unlabeled_image(self, request):
        q = Image.objects.filter(picked_label = "").filter(is_sent = False)
        image = q.first()
        image.is_sent = True
        image.save()

        possible_labels = image.image_set.possible_labels
        imageData = ImageSerializer(image).data
        imageData['possible_labels'] = possible_labels

        return JsonResponse(imageData)
    
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
        if label in image.image_set.possible_labels:
            image.picked_label = request.data['label']
            image.save()
            return JsonResponse({'status': True, 'message': "Success"})
            
        return JsonResponse({'status': False, 'message': "Invalid label"}, status=500)