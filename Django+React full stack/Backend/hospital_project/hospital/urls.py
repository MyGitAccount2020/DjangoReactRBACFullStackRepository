from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserListView,
    AdminAnalyticsView,
    AdminAnalyticsDetailView, UserDetailView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserListView.as_view(), name='user-list'),
    # -----------------------new changes-------------------
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # Add this line
    path('analytics/', AdminAnalyticsView.as_view(), name='analytics-list'),
    path('analytics/<int:pk>/', AdminAnalyticsDetailView.as_view(), name='analytics-detail'),
    # --------------------------------------------------------
]
