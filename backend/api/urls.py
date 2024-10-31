from django.urls import path
from .views import create_student, get_students, student_detail, register_teacher, login_teacher
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('get_students/', get_students, name='student_list'),
    path('create_student/', create_student, name='create_student'),
    path('student_detail/<int:pk>', student_detail, name='student'),
    path('register/', register_teacher, name='register_teacher'),
    path('login/', login_teacher, name='login_teacher'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]