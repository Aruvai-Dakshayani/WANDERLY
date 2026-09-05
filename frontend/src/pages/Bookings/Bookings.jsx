import { useEffect, useState } from "react";

import {
  CalendarDays,
  Users,
  MapPin,
  ArrowRight,
  Plane,
  Trash2,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";

import "./Bookings.css";

function Bookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const accessToken =
          localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("Please login to view your bookings.");
          setLoading(false);
          return;
        }

        const [
          bookingsResponse,
          destinationsResponse,
        ] = await Promise.all([
          api.get("/bookings/"),
          api.get("/destinations/"),
        ]);

        setBookings(bookingsResponse.data);
        setDestinations(destinationsResponse.data);

      } catch (err) {
        console.error(
          "Failed to load bookings:",
          err
        );

        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          setError(
            "Your session has expired. Please login again."
          );
        } else {
          setError(
            "Unable to load your bookings. Please try again."
          );
        }

      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getDestination = (destinationId) => {
    return destinations.find(
      (destination) =>
        Number(destination.id) ===
        Number(destinationId)
    );
  };

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      await api.delete(
        `/bookings/${bookingId}/`
      );

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: "Cancelled",
              }
            : booking
        )
      );

      alert("Booking cancelled successfully.");

    } catch (err) {
      console.error(
        "Failed to cancel booking:",
        err
      );

      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

      } else {
        alert(
          "Unable to cancel the booking. Please try again."
        );
      }
    }
  };

  const getStatusClass = (status) => {
    if (status === "Cancelled") {
      return "booking-status cancelled";
    }

    return "booking-status confirmed";
  };

  const getStatusIcon = (status) => {
    if (status === "Cancelled") {
      return <XCircle size={15} />;
    }

    return <CheckCircle size={15} />;
  };

  /* ============================= */
  /* LOADING */
  /* ============================= */

  if (loading) {
    return (
      <main className="bookings-page">

        <section className="bookings-hero">

          <div className="bookings-hero-content">

            <div className="bookings-icon">
              <Plane size={28} />
            </div>

            <p className="bookings-hero-label">
              YOUR JOURNEYS
            </p>

            <h1>
              My Bookings
            </h1>

            <p>
              Manage your upcoming trips and keep
              track of all your travel plans in one
              place.
            </p>

          </div>

        </section>

        <section className="bookings-container">

          <div className="bookings-loading">

            <div className="bookings-spinner"></div>

            <h3>
              Loading your bookings...
            </h3>

            <p>
              Please wait while we retrieve your
              travel plans.
            </p>

          </div>

        </section>

      </main>
    );
  }

  /* ============================= */
  /* ERROR */
  /* ============================= */

  if (error) {
    return (
      <main className="bookings-page">

        <section className="bookings-hero">

          <div className="bookings-hero-content">

            <div className="bookings-icon">
              <Plane size={28} />
            </div>

            <p className="bookings-hero-label">
              YOUR JOURNEYS
            </p>

            <h1>
              My Bookings
            </h1>

            <p>
              Manage your upcoming trips and keep
              track of all your travel plans in one
              place.
            </p>

          </div>

        </section>

        <section className="bookings-container">

          <div className="empty-bookings">

            <div className="empty-bookings-icon">
              <XCircle size={42} />
            </div>

            <h3>
              {error}
            </h3>

            <p>
              Please login again to access your
              bookings.
            </p>

            <Link
              to="/login"
              className="empty-bookings-button"
            >
              Login
              <ArrowRight size={18} />
            </Link>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="bookings-page">

      {/* ============================= */}
      {/* HERO */}
      {/* ============================= */}

      <section className="bookings-hero">

        <div className="bookings-hero-content">

          <div className="bookings-icon">
            <Plane size={28} />
          </div>

          <p className="bookings-hero-label">
            YOUR JOURNEYS
          </p>

          <h1>
            My Bookings
          </h1>

          <p>
            Manage your upcoming trips and keep track
            of all your travel plans in one place.
          </p>

        </div>

      </section>


      {/* ============================= */}
      {/* BOOKINGS */}
      {/* ============================= */}

      <section className="bookings-container">

        <div className="bookings-header">

          <div>

            <span className="bookings-label">
              YOUR TRAVEL PLANS
            </span>

            <h2>
              {bookings.length}{" "}
              {bookings.length === 1
                ? "Booking"
                : "Bookings"}
            </h2>

          </div>

          <Link
            to="/destinations"
            className="explore-bookings-button"
          >
            <span>
              Explore Destinations
            </span>

            <ArrowRight size={18} />
          </Link>

        </div>


        {/* ============================= */}
        {/* EMPTY */}
        {/* ============================= */}

        {bookings.length === 0 ? (

          <div className="empty-bookings">

            <div className="empty-bookings-icon">
              <Plane size={42} />
            </div>

            <h3>
              No bookings yet
            </h3>

            <p>
              You haven't booked any trips yet.
              Explore destinations and plan your
              next adventure.
            </p>

            <Link
              to="/destinations"
              className="empty-bookings-button"
            >
              Explore Destinations
              <ArrowRight size={18} />
            </Link>

          </div>

        ) : (

          /* ============================= */
          /* BOOKING CARDS */
          /* ============================= */

          <div className="bookings-grid">

            {bookings.map((booking) => {

              const destination =
                getDestination(
                  booking.destination
                );

              const isCancelled =
                booking.status === "Cancelled";

              return (
                <article
                  className={`booking-card ${
                    isCancelled
                      ? "booking-card-cancelled"
                      : ""
                  }`}
                  key={booking.id}
                >

                  {/* IMAGE */}

                  <div className="booking-image">

                    <img
                      src={
                        destination?.image || ""
                      }
                      alt={
                        destination?.name ||
                        "Destination"
                      }
                    />

                    <div
                      className={getStatusClass(
                        booking.status
                      )}
                    >
                      {getStatusIcon(
                        booking.status
                      )}

                      <span>
                        {booking.status}
                      </span>
                    </div>

                    <div className="booking-number">
                      Booking #{booking.id}
                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="booking-content">

                    <div className="booking-location">

                      <MapPin size={16} />

                      <span>
                        {destination?.location ||
                          "Destination"}
                      </span>

                    </div>


                    <h3>
                      {destination?.name ||
                        `Destination #${booking.destination}`}
                    </h3>


                    {/* DETAILS */}

                    <div className="booking-details">

                      <div className="booking-detail-item">

                        <CalendarDays size={17} />

                        <div>
                          <small>
                            Travel Date
                          </small>

                          <span>
                            {booking.travel_date}
                          </span>
                        </div>

                      </div>


                      <div className="booking-detail-item">

                        <Users size={17} />

                        <div>
                          <small>
                            Travelers
                          </small>

                          <span>
                            {booking.travelers}{" "}
                            {booking.travelers === 1
                              ? "Traveler"
                              : "Travelers"}
                          </span>
                        </div>

                      </div>

                    </div>


                    {/* BOTTOM */}

                    <div className="booking-bottom">

                      <div className="booking-total">

                        <small>
                          Total Price
                        </small>

                        <strong>
                          ₹
                          {Number(
                            booking.total_price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>


                      <button
                        className={`cancel-booking-button ${
                          isCancelled
                            ? "cancelled-button"
                            : ""
                        }`}
                        onClick={() =>
                          cancelBooking(
                            booking.id
                          )
                        }
                        disabled={isCancelled}
                      >

                        {isCancelled ? (
                          <>
                            <CheckCircle size={16} />
                            Cancelled
                          </>
                        ) : (
                          <>
                            <Trash2 size={16} />
                            Cancel Booking
                          </>
                        )}

                      </button>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </section>


      {/* ============================= */}
      {/* CTA */}
      {/* ============================= */}

      <section className="bookings-cta">

        <div className="bookings-cta-icon">
          <Plane size={30} />
        </div>

        <div className="bookings-cta-content">

          <p>
            KEEP EXPLORING
          </p>

          <h2>
            Ready for another adventure?
          </h2>

          <span>
            Discover new destinations and create
            unforgettable memories.
          </span>

        </div>

        <Link
          to="/destinations"
          className="bookings-cta-button"
        >
          Explore Now
          <ArrowRight size={18} />
        </Link>

      </section>

    </main>
  );
}

export default Bookings;