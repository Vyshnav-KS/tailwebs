# api/helper.py
from .models import Student
from .serializer import StudentSerializer  # Ensure the serializer is imported
from django.core.exceptions import ValidationError

def add_or_update_student(data):

    name = data.get('name')
    subject = data.get('subject')
    marks = data.get('marks', 0)

    if not name or not subject:
        raise ValidationError("Name and subject are required fields.")

    try:
        student = Student.objects.get(name=name, subject=subject)
        student.marks += marks
        student.save()
    except Student.DoesNotExist:
        student = Student.objects.create(name=name, subject=subject, marks=marks)

    serializer = StudentSerializer(student)
    # print(f"Final serializer: {serializer}")
    return serializer.data 
