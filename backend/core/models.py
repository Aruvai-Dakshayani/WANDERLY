from django.db import models
from django.contrib.auth.models import User


class Destination(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    reviews = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class Package(models.Model):
    name = models.CharField(max_length=150)
    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name="packages"
    )
    duration = models.CharField(max_length=100)
    description = models.TextField()
    image = models.URLField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)

    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    travel_date = models.DateField()
    travelers = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(
    max_digits=12,
    decimal_places=2
)
    status = models.CharField(
        max_length=50,
        default="Confirmed"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.destination.name}"


class Wishlist(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="wishlist"
    )
    destination = models.ForeignKey(
        Destination,
        on_delete=models.CASCADE,
        related_name="wishlisted_by"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "destination")

    def __str__(self):
        return f"{self.user.username} - {self.destination.name}"
