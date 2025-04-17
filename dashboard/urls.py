from django.urls import path
from django.contrib.auth import views as auth_views
from . import api_views
from . import views
from .api_views import UploadCSVView, FinancialDataView
from .views import get_csrf_token


urlpatterns = [
    path('dashboard/upload/', UploadCSVView.as_view(), name='upload-csv'),
    path('dashboard/table/', FinancialDataView.as_view(), name='financial-data'),
    path('', views.index, name='index'),
    # path('login/', auth_views.LoginView.as_view(
    # template_name='login.html',
    # redirect_authenticated_user=True,
    # next_page='/dashboard/'  # 👈 This line handles the redirection
    # ), name='login'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    # path('login/', views.login_view, name='login'),
    path('signup/', views.SignupPage, name='signup'),
    path('api/csrf/', get_csrf_token),
]
