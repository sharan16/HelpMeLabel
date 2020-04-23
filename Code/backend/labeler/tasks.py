from background_task import background
from .models import Image


@background
def reset_image_retrieve():
    for image in Image.objects.all():
        image.is_sent = False
        image.save()