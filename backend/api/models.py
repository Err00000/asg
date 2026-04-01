from django.db import models
from django.contrib.auth.models import User

class UserClick(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clicks')
    element_id = models.CharField(max_length=255, null=True, blank=True)
    element_text = models.CharField(max_length=255, null=True, blank=True)
    page_path = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} clicked {self.element_text or self.element_id} on {self.page_path}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"

class Service(models.Model):
    slug = models.SlugField(unique=True)
    icon_name = models.CharField(max_length=50, help_text="Lucide icon name (e.g. car, shield)")
    # Store translations as { "ro": "Titlu", "de": "Titel", ... }
    titles = models.JSONField(default=dict, help_text="Translations for title")
    descriptions = models.JSONField(default=dict, help_text="Translations for description", blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.slug

class Partner(models.Model):
    services = models.ManyToManyField(Service, related_name='partners')
    name = models.CharField(max_length=255)
    logo_url = models.URLField(max_length=500, blank=True)
    descriptions = models.JSONField(default=dict, help_text="Translations for description", blank=True)
    whatsapp_number = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.00)

    def __str__(self):
        return f"{self.name} ({self.services.count()} services)"

class Car(models.Model):
    brand = models.JSONField(default=dict) # {"ro": "Audi", "de": "Audi", ...}
    model = models.JSONField(default=dict)
    year = models.PositiveIntegerField()
    km = models.CharField(max_length=50)
    power = models.JSONField(default=dict) # {"ro": "231 CP", "de": "231 PS"}
    fuel = models.JSONField(default=dict) # {"ro": "Diesel", "de": "Diesel"}
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image_url = models.URLField(max_length=500)
    is_featured = models.BooleanField(default=False)
    is_sold = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.00)
    
    # Detailed specs (Translatable)
    series = models.JSONField(default=dict, blank=True)
    equipment = models.JSONField(default=dict, blank=True)
    displacement = models.CharField(max_length=50, blank=True) # Usually standard cm3
    seats = models.CharField(max_length=20, blank=True)
    doors = models.CharField(max_length=20, blank=True)
    pollution = models.CharField(max_length=50, blank=True)
    itp = models.JSONField(default=dict, blank=True)
    climate = models.JSONField(default=dict, blank=True)
    airbags = models.JSONField(default=dict, blank=True)
    color_mfr = models.CharField(max_length=100, blank=True) # Keep as is or JSON? Let's do JSON for color names
    color = models.JSONField(default=dict, blank=True)
    interior = models.JSONField(default=dict, blank=True)
    towing_braked = models.CharField(max_length=50, blank=True)
    towing_unbraked = models.CharField(max_length=50, blank=True)
    weight = models.CharField(max_length=50, blank=True)
    cylinders = models.CharField(max_length=20, blank=True)
    tank = models.CharField(max_length=50, blank=True)
    engine_drive = models.JSONField(default=dict, blank=True)
    energy_consumption = models.JSONField(default=dict, blank=True)
    co2_emissions = models.CharField(max_length=100, blank=True)
    fuel_consumption = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        brand_str = self.brand.get('ro', 'Car') if isinstance(self.brand, dict) else str(self.brand)
        model_str = self.model.get('ro', '') if isinstance(self.model, dict) else str(self.model)
        return f"{brand_str} {model_str} ({self.year})"
