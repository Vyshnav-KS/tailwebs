from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User



# Create your models here.
# class Teacher(models.Model):
#     name = models.CharField(max_length=50)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)

#     def save(self, *args, **kwargs):
#         if not self.pk:
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)
    
#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)
    
#     def __str__(self):
#         return self.name

# class User(User):
#     name = models.CharField(max_length=50)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)

#     def save(self, *args, **kwargs):
#         if not self.pk:  # Ensures password is only hashed for new users
#             self.password = make_password(self.password)
#         super().save(*args, **kwargs)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)

#     def __str__(self):
#         return self.name
    
class Student(models.Model):
    name = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    marks = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.subject} - {self.marks}"