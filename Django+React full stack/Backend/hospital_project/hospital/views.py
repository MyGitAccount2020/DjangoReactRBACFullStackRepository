from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import authenticate
from .serializers import UserSerializer, AdminAnalyticsSerializer
from rest_framework.authtoken.models import Token
from .permissions import IsDoctor
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import CustomUser, AdminAnalytics
from rest_framework.permissions import AllowAny


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Optionally, create a token for the new user
            token, created = Token.objects.get_or_create(user=user)
            return Response({'user': serializer.data, 'token': token.key},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)
            return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)



class DoctorOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsDoctor]

    def get(self, request):
        return Response({"message": "Hello, Doctor!"})

# ------------------new changes-------------------
class AdminAnalyticsView(generics.ListCreateAPIView):
    serializer_class = AdminAnalyticsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AdminAnalytics.objects.filter(admin=self.request.user)

    def perform_create(self, serializer):
        serializer.save(admin=self.request.user)

class AdminAnalyticsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdminAnalyticsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AdminAnalytics.objects.filter(admin=self.request.user)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_destroy(self, instance):
        # Add any custom deletion logic here
        instance.delete()
 # --------------------------------------------------