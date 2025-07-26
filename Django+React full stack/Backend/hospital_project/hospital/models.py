from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username

# -------------------new changes-------------------
class AdminAnalytics(models.Model):
    admin = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='analytics_records'
    )
    patient_name = models.CharField(max_length=100)
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    profit = models.DecimalField(max_digits=10, decimal_places=2)
    loss = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Admin Analytics"
        ordering = ['-date_created']

    def __str__(self):
        return f"{self.patient_name} - {self.admin.username}"
        # ---------------------------------------------------