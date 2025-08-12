from django.contrib.auth.models import User
from rest_framework import serializers

class userserializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True , min_length=8 , style = {'input_type' : 'password'})    # as we only wanna allow user to set password not allowing it to retrieve password from get requrst so write only permission is given
    class Meta:
        model = User
        fields = ['username' , 'email' , 'password']
     
    def create(self, validated_data):    # this class will automatically validate the data and then send data to this function
        # if we do user.objects.create     then this will set the password just as a plain text
        # create_user will automatically hash the password
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        # user = User.objects.create_user(**validated_data)    this can be also used to make user in User model , so all the fields given will be setted to the user model's entry
        return user