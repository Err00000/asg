from django.contrib import admin
from .models import UserClick, ContactMessage, Service, Partner, Car

@admin.register(UserClick)
class UserClickAdmin(admin.ModelAdmin):
    list_display = ('user', 'element_text', 'element_id', 'page_path', 'timestamp')
    list_filter = ('user', 'page_path', 'timestamp')
    search_fields = ('element_text', 'element_id', 'user__username')
    ordering = ('-timestamp',)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'phone', 'message')
    ordering = ('-created_at',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('slug', 'icon_name', 'is_active', 'order')
    list_editable = ('is_active', 'order')
    search_fields = ('slug', 'titles')
    prepopulated_fields = {'slug': ('slug',)}

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'whatsapp_number', 'rating')
    list_filter = ('services',)
    search_fields = ('name', 'services__slug')
    filter_horizontal = ('services',)

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('brand', 'model', 'year', 'price', 'is_featured', 'is_sold')
    list_filter = ('brand', 'year', 'is_featured', 'is_sold')
    list_editable = ('price', 'is_featured', 'is_sold')
    search_fields = ('brand', 'model', 'year')
