import {
  CalendarDays,
  CheckCircle,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import DestinationCard from "../../components/DestinationCard/DestinationCard";
import PackageCard from "../../components/PackageCard/PackageCard";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

import "./Home.css";

function Home() {
  const destinations = [
    {
      name: "Goa",
      location: "Goa, India",
      price: "4,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kerala",
      location: "Kerala, India",
      price: "6,499",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Manali",
      location: "Himachal Pradesh, India",
      price: "7,999",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kashmir",
      location: "Jammu & Kashmir, India",
      price: "9,999",
      image:
        "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Jaipur",
      location: "Rajasthan, India",
      price: "5,499",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Andaman",
      location: "Andaman Islands, India",
      price: "10,999",
      image:
        "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const packages = [
    {
      id: 1,
      name: "Goa Beach Escape",
      duration: "4 Days / 3 Nights",
      rating: "4.8",
      price: "12,999",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Kerala Backwaters",
      duration: "5 Days / 4 Nights",
      rating: "4.9",
      price: "15,999",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Kashmir Paradise",
      duration: "6 Days / 5 Nights",
      rating: "4.9",
      price: "19,999",
      image:
        "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const features = [
    {
      icon: <CheckCircle size={28} />,
      title: "Best Prices",
      description:
        "Get great travel experiences at competitive prices without compromising on quality.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Trusted Experiences",
      description:
        "Explore carefully selected destinations and travel experiences you can trust.",
    },
    {
      icon: <CalendarDays size={28} />,
      title: "Easy Booking",
      description:
        "Plan and book your next adventure through a simple and convenient experience.",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      description:
        "Our support team is here to help you whenever you need assistance.",
    },
  ];

  const reviews = [
    {
      name: "Sarah",
      location: "Bangalore, India",
      rating: 5,
      review:
        "Wanderly made our trip planning incredibly easy. The destination recommendations were amazing!",
    },
    {
      name: "Rahul",
      location: "Hyderabad, India",
      rating: 5,
      review:
        "The experience was smooth from discovering destinations to planning our complete trip.",
    },
    {
      name: "Priya",
      location: "Chennai, India",
      rating: 5,
      review:
        "Beautiful destinations, simple booking and great support. I would definitely use Wanderly again.",
    },
  ];

  return (
    <main className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero">
        <div className="hero-content">

          <p className="hero-subtitle">
            EXPLORE THE WORLD
          </p>

          <h1>
            Discover Your
            <span> Next Adventure</span>
          </h1>

          <p className="hero-description">
            Explore beautiful destinations, discover amazing places,
            and create unforgettable memories with Wanderly.
          </p>

          <Link
            to="/destinations"
            className="hero-button"
          >
            Explore Destinations
          </Link>

        </div>
      </section>


      {/* ================= SEARCH SECTION ================= */}

      <section className="search-section">

        <div className="search-container">

          <div className="search-item">
            <MapPin size={22} />

            <div>
              <label>Destination</label>

              <input
                type="text"
                placeholder="Where do you want to go?"
              />
            </div>
          </div>


          <div className="search-item">
            <CalendarDays size={22} />

            <div>
              <label>Travel Date</label>

              <input
                type="date"
              />
            </div>
          </div>


          <div className="search-item">
            <Users size={22} />

            <div>
              <label>Guests</label>

              <input
                type="number"
                placeholder="2"
                min="1"
              />
            </div>
          </div>


          <button className="search-button">
            <Search size={20} />
            Search
          </button>

        </div>

      </section>


      {/* ================= POPULAR DESTINATIONS ================= */}

      <section className="destinations-section">

        <div className="section-header">

          <div>

            <p className="section-subtitle">
              EXPLORE
            </p>

            <h2>
              Popular Destinations
            </h2>

            <p className="section-description">
              Discover some of the most beautiful places and
              unforgettable experiences.
            </p>

          </div>

          <Link
            to="/destinations"
            className="view-all-button"
          >
            View All
          </Link>

        </div>


        <div className="destinations-grid">

          {destinations.map((destination) => (

            <DestinationCard
              key={destination.name}
              image={destination.image}
              name={destination.name}
              location={destination.location}
              price={destination.price}
            />

          ))}

        </div>

      </section>


      {/* ================= POPULAR PACKAGES ================= */}

      <section className="packages-section">

        <div className="section-header">

          <div>

            <p className="section-subtitle">
              TRAVEL WITH US
            </p>

            <h2>
              Popular Travel Packages
            </h2>

            <p className="section-description">
              Choose from our carefully designed travel
              packages and enjoy a memorable journey.
            </p>

          </div>

          <Link
            to="/packages"
            className="view-all-button"
          >
            View All
          </Link>

        </div>


        <div className="packages-grid">

          {packages.map((travelPackage) => (

            <PackageCard
              key={travelPackage.id}
              id={travelPackage.id}
              image={travelPackage.image}
              name={travelPackage.name}
              duration={travelPackage.duration}
              rating={travelPackage.rating}
              price={travelPackage.price}
            />

          ))}

        </div>

      </section>


      {/* ================= WHY CHOOSE WANDERLY ================= */}

      <section className="features-section">

        <div className="section-header features-header">

          <div>

            <p className="section-subtitle">
              WHY WANDERLY
            </p>

            <h2>
              Why Choose Wanderly?
            </h2>

            <p className="section-description">
              We make your travel planning simple, comfortable,
              and memorable from start to finish.
            </p>

          </div>

        </div>


        <div className="features-grid">

          {features.map((feature) => (

            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />

          ))}

        </div>

      </section>


      {/* ================= CUSTOMER REVIEWS ================= */}

      <section className="reviews-section">

        <div className="section-header reviews-header">

          <div>

            <p className="section-subtitle">
              TESTIMONIALS
            </p>

            <h2>
              What Our Travelers Say
            </h2>

            <p className="section-description">
              Hear from travelers who explored their next
              adventure with Wanderly.
            </p>

          </div>

        </div>


        <div className="reviews-grid">

          {reviews.map((review) => (

            <ReviewCard
              key={review.name}
              name={review.name}
              location={review.location}
              review={review.review}
              rating={review.rating}
            />

          ))}

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="cta-section">

        <div className="cta-content">

          <p className="cta-small-title">
            START YOUR JOURNEY
          </p>

          <h2>
            Ready for Your Next Adventure?
          </h2>

          <p>
            Discover amazing destinations and create unforgettable
            memories with Wanderly.
          </p>

          <Link
            to="/destinations"
            className="cta-button"
          >
            Explore Destinations
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;