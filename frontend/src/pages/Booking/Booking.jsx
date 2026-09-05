import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  CalendarDays,
  Users,
  MapPin,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

import api from "../../api/api";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.destination;

  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!destination) {
    return (
      <main className="booking-page">

        <div className="booking-error">

          <div className="booking-error-icon">
            !
          </div>

          <h2>Destination not found</h2>

          <p>
            Please select a destination before making a booking.
          </p>

          <button
            onClick={() => navigate("/destinations")}
          >
            Explore Destinations
          </button>

        </div>

      </main>
    );
  }

  const price = Number(
    String(destination.price).replace(/[₹,]/g, "")
  );

  const totalPrice = price * travelers;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!destination.id) {
      alert(
        "Destination information is missing. Please go back and select the destination again."
      );
      return;
    }

    if (!date) {
      alert("Please select a travel date.");
      return;
    }

    const accessToken =
      localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Please login before making a booking.");
      navigate("/login");
      return;
    }

    const bookingData = {
      destination: Number(destination.id),
      travel_date: date,
      travelers: Number(travelers),
      total_price: Number(totalPrice.toFixed(2)),
    };

    console.log(
      "Booking data being sent:",
      bookingData
    );

    try {
      setLoading(true);

      const response = await api.post(
        "/bookings/",
        bookingData
      );

      console.log(
        "Booking successful:",
        response.data
      );

      alert("Booking confirmed successfully!");

      navigate("/bookings");

    } catch (error) {

      console.error("Booking error:", error);

      console.log(
        "Booking API response:",
        error.response?.data
      );

      if (error.response?.status === 401) {

        alert(
          "Your session has expired. Please login again."
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login");

      } else {

        alert(
          JSON.stringify(
            error.response?.data ||
              "Booking failed. Please try again."
          )
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="booking-page">

      {/* ============================= */}
      {/* HERO */}
      {/* ============================= */}

      <section className="booking-hero">

        <div className="booking-hero-content">

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <p className="booking-hero-label">
            PLAN YOUR JOURNEY
          </p>

          <h1>
            Book Your Trip
          </h1>

          <p className="booking-hero-description">
            Complete your booking details and get ready
            for an unforgettable adventure.
          </p>

        </div>

      </section>


      {/* ============================= */}
      {/* BOOKING CONTENT */}
      {/* ============================= */}

      <section className="booking-container">

        <div className="booking-layout">

          {/* ============================= */}
          {/* TRIP SUMMARY */}
          {/* ============================= */}

          <div className="booking-destination-card">

            <div className="booking-destination-image">

              <img
                src={destination.image}
                alt={destination.name}
              />

            </div>

            <div className="booking-destination-content">

              <div className="booking-destination-location">

                <MapPin size={16} />

                <span>
                  {destination.location}
                </span>

              </div>

              <h2>
                {destination.name}
              </h2>

              <p>
                {destination.description}
              </p>

              <div className="booking-price">

                <span>
                  Starting from
                </span>

                <strong>
                  ₹{price.toLocaleString("en-IN")}
                </strong>

                <small>
                  per traveler
                </small>

              </div>

            </div>

          </div>


          {/* ============================= */}
          {/* BOOKING FORM */}
          {/* ============================= */}

          <div className="booking-form-card">

            <div className="booking-form-header">

              <div>

                <p>
                  YOUR TRIP
                </p>

                <h2>
                  Booking Details
                </h2>

              </div>

              <div className="booking-secure-badge">

                <ShieldCheck size={17} />

                <span>
                  Secure
                </span>

              </div>

            </div>


            <form onSubmit={handleBooking}>

              {/* DATE */}

              <div className="form-group">

                <label htmlFor="travel-date">

                  <CalendarDays size={17} />

                  Travel Date

                </label>

                <input
                  id="travel-date"
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  required
                />

              </div>


              {/* TRAVELERS */}

              <div className="form-group">

                <label htmlFor="travelers">

                  <Users size={17} />

                  Number of Travelers

                </label>

                <select
                  id="travelers"
                  value={travelers}
                  onChange={(e) =>
                    setTravelers(
                      Number(e.target.value)
                    )
                  }
                >

                  <option value={1}>
                    1 Traveler
                  </option>

                  <option value={2}>
                    2 Travelers
                  </option>

                  <option value={3}>
                    3 Travelers
                  </option>

                  <option value={4}>
                    4 Travelers
                  </option>

                  <option value={5}>
                    5 Travelers
                  </option>

                  <option value={6}>
                    6 Travelers
                  </option>

                </select>

              </div>


              {/* PRICE BREAKDOWN */}

              <div className="price-breakdown">

                <div className="price-row">

                  <span>
                    Price per traveler
                  </span>

                  <strong>
                    ₹{price.toLocaleString("en-IN")}
                  </strong>

                </div>

                <div className="price-row">

                  <span>
                    Travelers
                  </span>

                  <strong>
                    × {travelers}
                  </strong>

                </div>

                <div className="price-divider"></div>

                <div className="total-price-row">

                  <div>

                    <span>
                      Total Amount
                    </span>

                    <small>
                      Including selected travelers
                    </small>

                  </div>

                  <strong>
                    ₹
                    {totalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </div>


              {/* CONFIRM */}

              <button
                type="submit"
                className="confirm-booking-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="booking-spinner"></span>

                    Confirming Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle size={19} />

                    Confirm Booking
                  </>
                )}

              </button>


              {/* SECURE MESSAGE */}

              <div className="booking-security">

                <ShieldCheck size={17} />

                <div>

                  <strong>
                    Your booking is secure
                  </strong>

                  <span>
                    Your travel details are safely processed.
                  </span>

                </div>

              </div>

            </form>

          </div>

        </div>


        {/* ============================= */}
        {/* TRUST FEATURES */}
        {/* ============================= */}

        <div className="booking-trust-section">

          <div className="booking-trust-item">

            <div className="booking-trust-icon">
              <ShieldCheck size={21} />
            </div>

            <div>

              <strong>
                Secure Booking
              </strong>

              <span>
                Your information is protected.
              </span>

            </div>

          </div>


          <div className="booking-trust-item">

            <div className="booking-trust-icon">
              <CheckCircle size={21} />
            </div>

            <div>

              <strong>
                Instant Confirmation
              </strong>

              <span>
                Get confirmation after booking.
              </span>

            </div>

          </div>


          <div className="booking-trust-item">

            <div className="booking-trust-icon">
              <CreditCard size={21} />
            </div>

            <div>

              <strong>
                Simple & Transparent
              </strong>

              <span>
                No hidden booking charges.
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Booking;