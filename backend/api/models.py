from django.db import models
from django.contrib.auth.models import User
    
class Student(models.Model):
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    marks = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.subject} - {self.marks}"