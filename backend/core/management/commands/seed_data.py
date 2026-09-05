from django.core.management.base import BaseCommand
from core.models import Destination, Package


class Command(BaseCommand):
    help = "Add sample destinations and travel packages to the database"

    def handle(self, *args, **kwargs):

        destinations_data = [
            {
                "name": "Goa",
                "location": "Goa, India",
                "description": "Relax on beautiful beaches, enjoy water activities, explore Portuguese architecture, and experience Goa's vibrant nightlife.",
                "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
                "price": 12999.00,
                "rating": 4.7,
                "reviews": 245,
            },
            {
                "name": "Kerala",
                "location": "Kerala, India",
                "description": "Experience peaceful backwaters, lush green landscapes, traditional houseboats, and the natural beauty of God's Own Country.",
                "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
                "price": 14999.00,
                "rating": 4.8,
                "reviews": 312,
            },
            {
                "name": "Kashmir",
                "location": "Jammu & Kashmir, India",
                "description": "Discover snow-covered mountains, beautiful valleys, Dal Lake, houseboats, and breathtaking Himalayan scenery.",
                "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
                "price": 19999.00,
                "rating": 4.9,
                "reviews": 387,
            },
            {
                "name": "Manali",
                "location": "Himachal Pradesh, India",
                "description": "Enjoy mountain adventures, scenic valleys, waterfalls, snow activities, and the peaceful beauty of the Himalayas.",
                "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
                "price": 15999.00,
                "rating": 4.7,
                "reviews": 198,
            },
            {
                "name": "Jaipur",
                "location": "Rajasthan, India",
                "description": "Explore magnificent forts, royal palaces, colorful markets, traditional cuisine, and the rich heritage of Rajasthan.",
                "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41",
                "price": 9999.00,
                "rating": 4.6,
                "reviews": 176,
            },
            {
                "name": "Andaman",
                "location": "Andaman & Nicobar Islands, India",
                "description": "Experience crystal-clear waters, tropical beaches, coral reefs, snorkeling, scuba diving, and island adventures.",
                "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
                "price": 22999.00,
                "rating": 4.8,
                "reviews": 221,
            },
        ]

        packages_data = [
            {
                "name": "Goa Beach Escape",
                "destination": "Goa",
                "duration": "4 Days / 3 Nights",
                "description": "A relaxing Goa vacation covering beautiful beaches, sightseeing, local experiences, and leisure time.",
                "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
                "price": 24999.00,
                "rating": 4.7,
            },
            {
                "name": "Kerala Backwaters",
                "destination": "Kerala",
                "duration": "5 Days / 4 Nights",
                "description": "Explore Kerala's famous backwaters, enjoy a houseboat stay, visit scenic locations, and experience local culture.",
                "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
                "price": 29999.00,
                "rating": 4.8,
            },
            {
                "name": "Kashmir Paradise",
                "destination": "Kashmir",
                "duration": "6 Days / 5 Nights",
                "description": "Discover Srinagar, Gulmarg, Pahalgam, beautiful valleys, snow-covered landscapes, and Dal Lake.",
                "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
                "price": 39999.00,
                "rating": 4.9,
            },
            {
                "name": "Manali Adventure",
                "destination": "Manali",
                "duration": "5 Days / 4 Nights",
                "description": "An exciting Himalayan trip featuring mountain sightseeing, adventure activities, scenic valleys, and local attractions.",
                "image": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                "price": 32999.00,
                "rating": 4.7,
            },
            {
                "name": "Jaipur Heritage Tour",
                "destination": "Jaipur",
                "duration": "3 Days / 2 Nights",
                "description": "Explore Jaipur's magnificent forts, palaces, markets, cultural attractions, and royal heritage.",
                "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41",
                "price": 19999.00,
                "rating": 4.6,
            },
            {
                "name": "Andaman Island Escape",
                "destination": "Andaman",
                "duration": "6 Days / 5 Nights",
                "description": "Enjoy tropical beaches, island sightseeing, water sports, snorkeling, and a relaxing island getaway.",
                "image": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
                "price": 44999.00,
                "rating": 4.8,
            },
        ]

        created_destinations = 0
        created_packages = 0

        for data in destinations_data:
            destination, created = Destination.objects.get_or_create(
                name=data["name"],
                defaults={
                    "location": data["location"],
                    "description": data["description"],
                    "image": data["image"],
                    "price": data["price"],
                    "rating": data["rating"],
                    "reviews": data["reviews"],
                },
            )

            if created:
                created_destinations += 1

        for data in packages_data:
            destination = Destination.objects.get(name=data["destination"])

            package, created = Package.objects.get_or_create(
                name=data["name"],
                defaults={
                    "destination": destination,
                    "duration": data["duration"],
                    "description": data["description"],
                    "image": data["image"],
                    "price": data["price"],
                    "rating": data["rating"],
                },
            )

            if created:
                created_packages += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully added {created_destinations} destinations "
                f"and {created_packages} packages."
            )
        )