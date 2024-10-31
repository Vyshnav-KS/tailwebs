from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
# from .models import Teacher, Student
from .models import User, Student
from .serializer import TeacherSerializer, StudentSerializer, TeacherLoginSerializer
from .helper import add_or_update_student
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_teacher(request):
    try:
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({"error": "Email already taken"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.save()
            # Generate a JWT token for the user
            refresh = RefreshToken.for_user(teacher)
            token = str(refresh.access_token)
            return Response({
                "user": serializer.data, 
                "token": token
            }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def login_teacher(request):
    try:
        serializer = TeacherLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(f"Email : {email}, Password : {password}")
            try:
                teacher = User.objects.get(email=email)
                if teacher.email:
                    if password == teacher.password:
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
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students(request):
    try:
        students = Student.objects.all()
        student_serializer = StudentSerializer(students, many=True)
        return Response(student_serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_student(request):
    print("Request data:", request.data)
    try:
        serializer = StudentSerializer(data = request.data)
        print("Request serializer:", serializer)
        if serializer.is_valid():
            print("TRUE")
            student_data = add_or_update_student(request.data)
            return Response(student_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def student_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


