from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Destination, Package, Booking, Wishlist
from .serializers import (
    DestinationSerializer,
    PackageSerializer,
    BookingSerializer,
    WishlistSerializer,
)


# =========================================================
# DESTINATIONS
# Public API - no login required
# =========================================================

class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [AllowAny]


# =========================================================
# PACKAGES
# Public API - no login required
# =========================================================

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [AllowAny]


# =========================================================
# BOOKINGS
# Login required
# =========================================================

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        booking = self.get_object()

        booking.status = "Cancelled"
        booking.save()

        return Response(
            {
                "message": "Booking cancelled successfully.",
                "booking": BookingSerializer(booking).data,
            },
            status=status.HTTP_200_OK,
        )


# =========================================================
# WISHLIST
# Login required
# =========================================================

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# =========================================================
# REGISTER
# Public API - no login required
# =========================================================

@api_view(["POST"])
def register_user(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response(
            {
                "error": "Username, email and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {
                "error": "Username already exists."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {
                "error": "Email already exists."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {
            "message": "Registration successful.",
            "username": user.username,
            "email": user.email,
        },
        status=status.HTTP_201_CREATED,
    )


# =========================================================
# LOGIN
# Public API - no login required
# =========================================================

@api_view(["POST"])
def login_user(request):

    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {
                "error": "Email and password are required."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:
        return Response(
            {
                "error": "Invalid email or password."
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    authenticated_user = authenticate(
        username=user.username,
        password=password,
    )

    if authenticated_user is None:
        return Response(
            {
                "error": "Invalid email or password."
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    refresh = RefreshToken.for_user(authenticated_user)

    return Response(
        {
            "message": "Login successful.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": authenticated_user.id,
                "username": authenticated_user.username,
                "email": authenticated_user.email,
            },
        },
        status=status.HTTP_200_OK,
    )