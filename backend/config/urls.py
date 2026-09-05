from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from core.views import (
    DestinationViewSet,
    PackageViewSet,
    BookingViewSet,
    WishlistViewSet,
    register_user,
    login_user,
)


router = DefaultRouter()

router.register(
    r"destinations",
    DestinationViewSet,
    basename="destination"
)

router.register(
    r"packages",
    PackageViewSet,
    basename="package"
)

router.register(
    r"bookings",
    BookingViewSet,
    basename="booking"
)

router.register(
    r"wishlist",
    WishlistViewSet,
    basename="wishlist"
)


urlpatterns = [

    path(
        "admin/",
        admin.site.urls
    ),

    path(
        "api/",
        include(router.urls)
    ),

    path(
        "api/register/",
        register_user,
        name="register"
    ),

    path(
        "api/login/",
        login_user,
        name="login"
    ),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
]