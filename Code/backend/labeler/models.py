from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings

# Create your models here.
class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.title

class ImageSet(models.Model):
  name = models.CharField(max_length=128)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  possible_labels = ArrayField(models.CharField(max_length=20, blank=True))

  def _str_(self):
    return self.name

class Image(models.Model):
  image_url = models.CharField(max_length=256)
  local_file_name = models.CharField(max_length=128)
  picked_label = models.CharField(max_length=20, blank=True)
  is_sent = models.BooleanField(default=False)
  image_set = models.ForeignKey('ImageSet', on_delete=models.CASCADE, default = None)

  def _str_(self):
    return self.local_file_name