from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def _str_(self):
    return self.title

class Image(models.Model):
  image_url = models.CharField(max_length=256)
  local_file_name = models.CharField(max_length=128)
  possible_labels = ArrayField(models.CharField(max_length=20, blank=True))
  picked_label = models.CharField(max_length=20, blank=True)
  def _str_(self):
    return self.local_file_name