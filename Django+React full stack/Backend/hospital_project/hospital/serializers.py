from rest_framework import serializers
from .models import CustomUser, AdminAnalytics


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ('id','username', 'password', 'email', 'role')

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

# -------------------new changes-------------------
class AdminAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminAnalytics
        fields = '__all__'
        read_only_fields = ('admin', 'date_created')

    def validate(self, data):
        if float(data['profit']) < 0 or float(data['loss']) < 0:
            raise serializers.ValidationError("Profit and loss cannot be negative")
        return data
        # ----------------------------------------------------