
from rest_framework import serializers
from .models import Todo, Image

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')

class ImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Image
    fields = ('id', 'image_url', 'local_file_name', 'possible_labels', 'picked_label')