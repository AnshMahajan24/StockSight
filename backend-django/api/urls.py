
from django.urls import path,include
from accounts import views as userviews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path('register/' , userviews.registerview.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # generating the access token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refreshing the acces  token
    path('protected-view/', userviews.ProtectedView.as_view()),
]