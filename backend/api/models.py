import io

from django.db import models
from django.core.validators import FileExtensionValidator
from pdf2image import convert_from_path
from django.core.files.base import ContentFile
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  

    def __str__(self):
        return self.username

class Semester(models.Model):
    number = models.IntegerField(unique=True)

    def __str__(self):
        return f"Semester {self.number}"
    
class Subject(models.Model):
    name = models.CharField(max_length=100)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='subjects')

    def __str__(self):
        return f"{self.name} - {self.semester.number}"
    
class Paper(models.Model):

    MIDSEM = 'MIDSEM'
    ENDSEM = 'ENDSEM'

    EXAM_TYPE_CHOICES = [
        (MIDSEM, 'Midsem'),
        (ENDSEM, 'Endsem'),
    ]

    year = models.IntegerField()
    subject = models.ForeignKey("Subject", on_delete=models.CASCADE)
    exam_type = models.CharField(max_length=10, choices=EXAM_TYPE_CHOICES)

    pdf = CloudinaryField(resource_type="image")

    uploaded_at = models.DateTimeField(auto_now_add=True)

    @property
    def preview_url(self):
        return f"https://res.cloudinary.com/dwe6n6goq/image/upload/pg_1/{self.pdf.public_id}.jpg"
    
    def __str__(self):
        return f"{self.subject.name} - {self.get_exam_type_display()} {self.year}"


# Create your models here.
