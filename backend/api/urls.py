from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('user/', views.get_user_data, name='user_data'),
    path('user/update-email/', views.update_email, name='update_email'),
    path('user/update-password/', views.update_password, name='update_password'),
    path('user/update-profile/', views.update_profile, name='update_profile'),
    path('track-click/', views.track_click, name='track_click'),
    path('contact/', views.submit_contact, name='submit_contact'),
    path('services/', views.get_services, name='get_services'),
    path('services/<slug:slug>/', views.get_service_detail, name='get_service_detail'),
    path('cars/', views.get_cars, name='get_cars'),
]
