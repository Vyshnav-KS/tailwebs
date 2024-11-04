from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User, Student
from .serializer import TeacherSerializer, StudentSerializer, TeacherLoginSerializer
from .helper import add_or_update_student
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics 
from rest_framework.views import APIView

# Create your views here.

class RegisterTeacherView(generics.CreateAPIView):
    permission_classes = ([AllowAny])
    serializer_class = TeacherSerializer

    def post(self, request):
        try:
            # Check if the email already exists
            if User.objects.filter(email=request.data.get('email')).exists():
                return Response({"error": "Email already taken"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                teacher = serializer.save()
                
                # Generate a JWT token for the teacher
                refresh = RefreshToken.for_user(teacher)
                token = str(refresh.access_token)
                
                return Response({
                    "user": serializer.data, 
                    "token": token
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginTeacherView(APIView):
    permission_classes = ([AllowAny])
    serializer_class = TeacherLoginSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                password = serializer.validated_data['password']
                
                try:
                    teacher = User.objects.get(email=email)
                    if teacher.email:
                        if teacher.password == password:
                            refresh = RefreshToken.for_user(teacher)
                            token = str(refresh.access_token)
                            teacher_data = TeacherSerializer(teacher).data  # Serialize the user data
                            return Response({
                                "user": teacher_data,
                                "token": token
                            }, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
                except User.DoesNotExist:
                    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ListStudentView(generics.ListCreateAPIView):
    permission_classes = ([IsAuthenticated])
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentCreation(generics.ListCreateAPIView):
    permission_classes = ([IsAuthenticated])
    serializer_class = StudentSerializer
    def post(self, request):
        try:
            serializer = self.get_serializer(data = request.data)
            if serializer.is_valid():
                student_data = add_or_update_student(request.data)
                return Response(student_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DetailedStudentView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = ([IsAuthenticated])
    queryset = Student.objects.all()
    serializer_class = StudentSerializer





