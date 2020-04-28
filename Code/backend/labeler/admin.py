from django.contrib import admin
from .models import Todo, Image, ImageSet # add this

class TodoAdmin(admin.ModelAdmin):  # add this
    list_display = ('title', 'description', 'completed') # add this

class ImageAdmin(admin.ModelAdmin):  # add this
    list_display = ('id', 'image_url', 'local_file_name', 'picked_label') # add this

class ImageSetAdmin(admin.ModelAdmin):  # add this
    list_display = ('id', 'name', 'owner', 'possible_labels') # add this

# Register your models here.
admin.site.register(Todo, TodoAdmin) # add this
admin.site.register(Image, ImageAdmin) # add this
admin.site.register(ImageSet, ImageSetAdmin) # add this