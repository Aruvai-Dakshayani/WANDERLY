from django.contrib import admin

from .models import Destination, Package, Booking, Wishlist


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "location",
        "price",
        "rating",
        "reviews",
    )
    search_fields = ("name", "location")


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "destination",
        "duration",
        "price",
        "rating",
    )
    search_fields = ("name", "destination__name")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "destination",
        "travel_date",
        "travelers",
        "total_price",
        "status",
        "created_at",
    )
    search_fields = ("user__username", "destination__name")
    list_filter = ("status", "travel_date")


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "destination",
        "created_at",
    )
    search_fields = ("user__username", "destination__name")
# Register your models here.
