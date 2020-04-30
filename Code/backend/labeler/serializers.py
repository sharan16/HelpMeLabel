
from rest_framework import serializers
from .models import Todo, Image, ImageSet

class TodoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Todo
    fields = ('id', 'title', 'description', 'completed')

class ImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Image
    fields = ('id', 'image_url', 'local_file_name', 'picked_label', "image_set")

class ImageSetSerializer(serializers.ModelSerializer):
  class Meta:
    model = ImageSet
    fields = ('id', 'name', 'user', 'possible_labels')