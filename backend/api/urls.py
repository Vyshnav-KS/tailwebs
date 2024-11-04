from django.urls import path
# from .views import create_student, get_students, student_detail, register_teacher, login_teacher
from .views import ListStudentView, StudentCreation, DetailedStudentView, RegisterTeacherView, LoginTeacherView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('get_students/', ListStudentView.as_view(), name='student_list'),
    path('create_student/', StudentCreation.as_view(), name='create_student'),
    path('student_detail/<int:pk>', DetailedStudentView.as_view(), name='student'),
    path('register/', RegisterTeacherView.as_view(), name='register_teacher'),
    path('login/', LoginTeacherView.as_view(), name='login_teacher'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]