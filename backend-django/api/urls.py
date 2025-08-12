
from django.urls import path,include
from accounts import views as userviews
urlpatterns = [

    # base api endpoint
    path('register/' , userviews.registerview.as_view()),
]