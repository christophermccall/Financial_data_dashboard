from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class FinancialData(models.Model):
    date = models.DateField()
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.date} - {self.category} - {self.amount}"
    
class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    page = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"User {self.user.username} performed {self.action} at {self.timestamp}"


def get_default_user():
    user, created = User.objects.get_or_create(username="default_user", email="default@example.com")
    return user.id 