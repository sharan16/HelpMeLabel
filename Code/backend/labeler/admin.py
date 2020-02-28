from django.contrib import admin
from .models import Todo, Image # add this

class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'description', 'completed') # add this

class ImageAdmin(admin.ModelAdmin):  # add this
    list_display = ('id', 'image_url', 'local_file_name', 'possible_labels', 'picked_label') # add this

# Register your models here.
admin.site.register(Todo, TodoAdmin) # add this
admin.site.register(Image, ImageAdmin) # add this