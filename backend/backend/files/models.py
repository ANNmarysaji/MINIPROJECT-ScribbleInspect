from django.db import models
import uuid

# Create your models here.


def generate_filename(instance, filename):
    return f'pdfs/{uuid.uuid4().hex[:10]}{filename}'


class Files(models.Model):

    pdf = models.FileField(upload_to=generate_filename)

    def __str__(self):
        return self.pdf
