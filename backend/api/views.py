from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, update_session_auth_hash
from rest_framework.authtoken.models import Token
from .models import UserClick, ContactMessage, Service, Partner, Car

@api_view(['GET'])
@permission_classes([AllowAny])
def get_services(request):
    services = Service.objects.filter(is_active=True)
    data = []
    for s in services:
        data.append({
            'slug': s.slug,
            'icon_name': s.icon_name,
            'titles': s.titles,
            'order': s.order
        })
    return Response(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_service_detail(request, slug):
    try:
        service = Service.objects.get(slug=slug, is_active=True)
        # Fetch partners associated with this service
        partners_qs = service.partners.all()
        partners = []
        for p in partners_qs:
            partners.append({
                'name': p.name,
                'logo_url': p.logo_url,
                'descriptions': p.descriptions,
                'whatsapp_number': p.whatsapp_number,
                'website': p.website,
                'rating': p.rating
            })
        
        return Response({
            'slug': service.slug,
            'icon_name': service.icon_name,
            'titles': service.titles,
            'descriptions': service.descriptions,
            'partners': partners
        })
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cars(request):
    cars = Car.objects.filter(is_sold=False)
    data = []
    for c in cars:
        data.append({
            'id': c.id,
            'brand': c.brand,
            'model': c.model,
            'year': c.year,
            'km': c.km,
            'power': c.power,
            'fuel': c.fuel,
            'price': c.price,
            'image_url': c.image_url,
            'is_featured': c.is_featured,
            'rating': c.rating,
            'series': c.series,
            'equipment': c.equipment,
            'displacement': c.displacement,
            'seats': c.seats,
            'doors': c.doors,
            'pollution': c.pollution,
            'itp': c.itp,
            'climate': c.climate,
            'airbags': c.airbags,
            'color_mfr': c.color_mfr,
            'color': c.color,
            'interior': c.interior,
            'towing_braked': c.towing_braked,
            'towing_unbraked': c.towing_unbraked,
            'weight': c.weight,
            'cylinders': c.cylinders,
            'tank': c.tank,
            'engine_drive': c.engine_drive,
            'energy_consumption': c.energy_consumption,
            'co2_emissions': c.co2_emissions,
            'fuel_consumption': c.fuel_consumption,
        })
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_click(request):
    element_id = request.data.get('element_id', '')
    element_text = request.data.get('element_text', '')
    page_path = request.data.get('page_path', '')
    
    UserClick.objects.create(
        user=request.user,
        element_id=element_id,
        element_text=element_text,
        page_path=page_path
    )
    return Response({'status': 'success'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    
    if not username or not password or not email:
        return Response({'error': 'Toate câmpurile sunt obligatorii'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Numele de utilizator este deja folosit'}, status=status.HTTP_400_BAD_REQUEST)
        
    user = User.objects.create_user(
        username=username, 
        email=email, 
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    Token.objects.create(user=user)
    
    return Response({'message': 'Cont creat cu succes'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Date de autentificare invalide'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    return Response({
        'username': request.user.username,
        'email': request.user.email,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_email(request):
    new_email = request.data.get('email')
    if not new_email:
        return Response({'error': 'Email-ul este obligatoriu'}, status=status.HTTP_400_BAD_REQUEST)
    
    request.user.email = new_email
    request.user.save()
    return Response({'message': 'Email actualizat cu succes'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_password(request):
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    
    if not old_password or not new_password:
        return Response({'error': 'Ambele parole sunt obligatorii'}, status=status.HTTP_400_BAD_REQUEST)
        
    if not request.user.check_password(old_password):
        return Response({'error': 'Parola actuală este incorectă'}, status=status.HTTP_400_BAD_REQUEST)
        
    request.user.set_password(new_password)
    request.user.save()
    return Response({'message': 'Parola a fost actualizată cu succes'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    
    request.user.first_name = first_name
    request.user.last_name = last_name
    request.user.save()
    return Response({'message': 'Profil actualizat cu succes'})

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    name = request.data.get('name')
    email = request.data.get('email')
    phone = request.data.get('phone')
    message = request.data.get('message')

    if not name or not email or not phone or not message:
        return Response({'error': 'Toate câmpurile sunt obligatorii'}, status=status.HTTP_400_BAD_REQUEST)

    ContactMessage.objects.create(
        name=name,
        email=email,
        phone=phone,
        message=message
    )

    return Response({'status': 'success', 'message': 'Mesajul a fost trimis cu succes'}, status=status.HTTP_201_CREATED)
