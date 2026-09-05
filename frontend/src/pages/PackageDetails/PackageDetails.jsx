import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Clock3,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../../api/api";

import "./PackageDetails.css";

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [destination, setDestination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const packageResponse = await api.get(`/packages/${id}/`);
        const packageData = packageResponse.data;

        setSelectedPackage(packageData);

        const destinationResponse = await api.get(
          `/destinations/${packageData.destination}/`
        );

        setDestination(destinationResponse.data);
      } catch (err) {
        console.error("Failed to fetch package details:", err);

        setError(
          "Unable to load this package. Please make sure the Django server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackageDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="package-details-page">
        <div className="package-details-loading">
          <div className="package-loading-spinner"></div>

          <h2>Loading Package...</h2>

          <p>
            Please wait while we load your travel experience.
          </p>
        </div>
      </main>
    );
  }

  if (error || !selectedPackage) {
    return (
      <main className="package-details-page">
        <div className="package-not-found">

          <div className="package-error-icon">
            !
          </div>

          <h2>Package Not Found</h2>

          <p>
            {error ||
              "Sorry, we couldn't find the travel package you're looking for."}
          </p>

          <Link
            to="/packages"
            className="back-packages-button"
          >
            <ArrowLeft size={18} />
            Back to Packages
          </Link>

        </div>
      </main>
    );
  }

  const packageLocation =
    destination?.location || "India";

  const packagePrice = Number(
    selectedPackage.price
  ).toLocaleString("en-IN");

  const handleBookNow = () => {
    navigate("/booking", {
      state: {
        destination: {
          id: destination.id,
          name: selectedPackage.name,
          location: packageLocation,
          price: selectedPackage.price,
          image: selectedPackage.image,
          description: selectedPackage.description,
          rating: selectedPackage.rating,
        },
      },
    });
  };

  return (
    <main className="package-details-page">

      {/* ============================= */}
      {/* HERO */}
      {/* ============================= */}

      <section className="package-details-hero">

        <img
          src={selectedPackage.image}
          alt={selectedPackage.name}
        />

        <div className="package-details-overlay"></div>

        <div className="package-details-hero-content">

          <button
            className="package-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="package-hero-location">
            <MapPin size={17} />
            <span>{packageLocation}</span>
          </div>

          <h1>
            {selectedPackage.name}
          </h1>

          <div className="package-hero-meta">

            <div className="package-hero-rating">
              <Star
                size={17}
                fill="currentColor"
              />

              <strong>
                {selectedPackage.rating}
              </strong>

              <span>
                Excellent rating
              </span>
            </div>

            <div className="package-hero-duration">
              <Clock3 size={17} />

              <span>
                {selectedPackage.duration}
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* ============================= */}
      {/* MAIN CONTENT */}
      {/* ============================= */}

      <section className="package-details-container">

        <div className="package-details-layout">

          {/* LEFT CONTENT */}

          <div className="package-main-content">

            {/* INTRO */}

            <div className="package-intro">

              <p className="details-label">
                ABOUT THIS PACKAGE
              </p>

              <h2>
                {selectedPackage.name}
              </h2>

              <p className="package-description">
                {selectedPackage.description}
              </p>

            </div>


            {/* TRIP INFORMATION */}

            <div className="trip-information">

              <div className="trip-info-item">

                <div className="trip-info-icon">
                  <Clock3 size={21} />
                </div>

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {selectedPackage.duration}
                  </strong>
                </div>

              </div>


              <div className="trip-info-item">

                <div className="trip-info-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <span>
                    Destination
                  </span>

                  <strong>
                    {packageLocation}
                  </strong>
                </div>

              </div>


              <div className="trip-info-item">

                <div className="trip-info-icon">
                  <Users size={21} />
                </div>

                <div>
                  <span>
                    Travel Type
                  </span>

                  <strong>
                    Group Friendly
                  </strong>
                </div>

              </div>

            </div>


            {/* HIGHLIGHTS */}

            <div className="package-highlights">

              <p className="details-label">
                PACKAGE HIGHLIGHTS
              </p>

              <h2>
                What You'll Experience
              </h2>

              <div className="highlights-list">

                <div>
                  <CheckCircle size={19} />

                  <span>
                    Beautiful sightseeing experiences
                  </span>
                </div>

                <div>
                  <CheckCircle size={19} />

                  <span>
                    Carefully selected travel experiences
                  </span>
                </div>

                <div>
                  <CheckCircle size={19} />

                  <span>
                    Comfortable and memorable journey
                  </span>
                </div>

                <div>
                  <CheckCircle size={19} />

                  <span>
                    Perfect for families and friends
                  </span>
                </div>

                <div>
                  <CheckCircle size={19} />

                  <span>
                    Dedicated travel assistance
                  </span>
                </div>

                <div>
                  <CheckCircle size={19} />

                  <span>
                    Easy and secure booking
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* ============================= */}
          {/* BOOKING CARD */}
          {/* ============================= */}

          <aside className="package-booking-card">

            <div className="booking-card-label">
              STARTING FROM
            </div>

            <div className="package-details-price">
              ₹{packagePrice}
            </div>

            <div className="per-traveler">
              per traveler
            </div>


            <div className="booking-card-divider"></div>


            <div className="booking-card-detail">

              <CalendarDays size={19} />

              <div>
                <span>
                  Travel Duration
                </span>

                <strong>
                  {selectedPackage.duration}
                </strong>
              </div>

            </div>


            <div className="booking-card-detail">

              <Star
                size={19}
                fill="currentColor"
              />

              <div>
                <span>
                  Traveler Rating
                </span>

                <strong>
                  {selectedPackage.rating} / 5
                </strong>
              </div>

            </div>


            <button
              className="book-package-button"
              onClick={handleBookNow}
            >
              <span>
                Book This Package
              </span>

              <ArrowRight size={19} />
            </button>


            <p className="secure-booking-text">
              <CheckCircle size={15} />
              Easy and secure booking
            </p>

          </aside>

        </div>

      </section>


      {/* ============================= */}
      {/* BOTTOM CTA */}
      {/* ============================= */}

      <section className="package-details-cta">

        <div className="package-details-cta-content">

          <p>
            READY TO TRAVEL?
          </p>

          <h2>
            Start Planning Your Adventure
          </h2>

          <span>
            Choose your dates and get ready for an unforgettable journey.
          </span>

        </div>

        <button
          onClick={handleBookNow}
          className="package-cta-button"
        >
          <span>
            Book Now
          </span>

          <ArrowRight size={18} />
        </button>

      </section>

    </main>
  );
}

export default PackageDetails;