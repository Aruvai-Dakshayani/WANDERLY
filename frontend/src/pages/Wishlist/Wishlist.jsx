import { useEffect, useState } from "react";

import {
  Heart,
  MapPin,
  Star,
  ArrowRight,
  Trash2,
  Plane,
  XCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";

import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem("accessToken");

        if (!token) {
          setError(
            "Please login to view your wishlist."
          );
          setLoading(false);
          return;
        }

        const [
          wishlistResponse,
          destinationsResponse,
        ] = await Promise.all([
          api.get("/wishlist/"),
          api.get("/destinations/"),
        ]);

        setWishlist(wishlistResponse.data);
        setDestinations(destinationsResponse.data);

      } catch (err) {
        console.error(
          "Failed to load wishlist:",
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
            "Unable to load your wishlist. Please try again."
          );
        }

      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  /* ============================= */
  /* MATCH WISHLIST + DESTINATIONS */
  /* ============================= */

  const wishlistDestinations = wishlist
    .map((item) => {
      return destinations.find(
        (destination) =>
          Number(destination.id) ===
          Number(item.destination)
      );
    })
    .filter(Boolean);

  /* ============================= */
  /* REMOVE FROM WISHLIST */
  /* ============================= */

  const removeFromWishlist = async (
    wishlistId,
    destinationName
  ) => {
    const confirmRemove = window.confirm(
      `Remove ${destinationName} from your wishlist?`
    );

    if (!confirmRemove) {
      return;
    }

    try {
      await api.delete(
        `/wishlist/${wishlistId}/`
      );

      setWishlist((previousWishlist) =>
        previousWishlist.filter(
          (item) => item.id !== wishlistId
        )
      );

    } catch (err) {
      console.error(
        "Failed to remove wishlist item:",
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
          "Unable to remove from wishlist. Please try again."
        );
      }
    }
  };

  /* ============================= */
  /* LOADING */
  /* ============================= */

  if (loading) {
    return (
      <main className="wishlist-page">

        <section className="wishlist-hero">

          <div className="wishlist-hero-content">

            <div className="wishlist-icon">
              <Heart
                size={28}
                fill="currentColor"
              />
            </div>

            <p className="wishlist-hero-label">
              YOUR FAVORITES
            </p>

            <h1>
              My Wishlist
            </h1>

            <p>
              Save the destinations that inspire you
              and keep your dream trips in one place.
            </p>

          </div>

        </section>

        <section className="wishlist-container">

          <div className="wishlist-loading">

            <div className="wishlist-spinner"></div>

            <h3>
              Loading your wishlist...
            </h3>

            <p>
              Please wait while we retrieve your
              saved destinations.
            </p>

          </div>

        </section>

      </main>
    );
  }

  /* ============================= */
  /* MAIN PAGE */
  /* ============================= */

  return (
    <main className="wishlist-page">

      {/* ============================= */}
      {/* HERO */}
      {/* ============================= */}

      <section className="wishlist-hero">

        <div className="wishlist-hero-content">

          <div className="wishlist-icon">
            <Heart
              size={28}
              fill="currentColor"
            />
          </div>

          <p className="wishlist-hero-label">
            YOUR FAVORITES
          </p>

          <h1>
            My Wishlist
          </h1>

          <p>
            Save the destinations that inspire you
            and keep your dream trips in one place.
          </p>

        </div>

      </section>


      {/* ============================= */}
      {/* CONTENT */}
      {/* ============================= */}

      <section className="wishlist-container">

        <div className="wishlist-header">

          <div>

            <span className="wishlist-label">
              SAVED DESTINATIONS
            </span>

            <h2>
              {wishlistDestinations.length}{" "}
              {wishlistDestinations.length === 1
                ? "Destination"
                : "Destinations"}
            </h2>

            <p className="wishlist-subtitle">
              Your favorite places, ready for your
              next adventure.
            </p>

          </div>

          <Link
            to="/destinations"
            className="wishlist-explore-top"
          >
            Explore Destinations
            <ArrowRight size={18} />
          </Link>

        </div>


        {/* ============================= */}
        {/* ERROR */}
        {/* ============================= */}

        {error && (

          <div className="wishlist-message">

            <div className="wishlist-message-icon">
              <XCircle size={40} />
            </div>

            <h3>
              {error}
            </h3>

            <p>
              Please login again to access your
              saved destinations.
            </p>

            <Link
              to="/login"
              className="wishlist-login-button"
            >
              Login
              <ArrowRight size={18} />
            </Link>

          </div>

        )}


        {/* ============================= */}
        {/* EMPTY */}
        {/* ============================= */}

        {!error &&
          wishlistDestinations.length === 0 && (

            <div className="wishlist-message">

              <div className="wishlist-message-icon">
                <Heart size={42} />
              </div>

              <h3>
                Your wishlist is empty
              </h3>

              <p>
                Start exploring destinations and
                save the places you want to visit.
              </p>

              <Link
                to="/destinations"
                className="wishlist-explore-button"
              >
                Explore Destinations
                <ArrowRight size={18} />
              </Link>

            </div>

          )}


        {/* ============================= */}
        {/* WISHLIST CARDS */}
        {/* ============================= */}

        {!error &&
          wishlistDestinations.length > 0 && (

            <div className="wishlist-grid">

              {wishlistDestinations.map(
                (destination) => {

                  const wishlistItem =
                    wishlist.find(
                      (item) =>
                        Number(item.destination) ===
                        Number(destination.id)
                    );

                  return (
                    <article
                      className="wishlist-card"
                      key={destination.id}
                    >

                      {/* IMAGE */}

                      <div className="wishlist-image">

                        <img
                          src={destination.image}
                          alt={destination.name}
                        />

                        <div className="wishlist-image-overlay">
                        </div>

                        <div className="wishlist-rating">

                          <Star
                            size={15}
                            fill="currentColor"
                          />

                          <span>
                            {destination.rating}
                          </span>

                        </div>

                        {wishlistItem && (
                          <button
                            type="button"
                            className="wishlist-remove-button"
                            onClick={() =>
                              removeFromWishlist(
                                wishlistItem.id,
                                destination.name
                              )
                            }
                            aria-label={`Remove ${destination.name} from wishlist`}
                          >
                            <Heart
                              size={20}
                              fill="currentColor"
                            />
                          </button>
                        )}

                      </div>


                      {/* CONTENT */}

                      <div className="wishlist-card-content">

                        <div className="wishlist-location">

                          <MapPin size={16} />

                          <span>
                            {destination.location}
                          </span>

                        </div>


                        <h3>
                          {destination.name}
                        </h3>


                        <p>
                          {destination.description}
                        </p>


                        <div className="wishlist-card-bottom">

                          <div className="wishlist-price">

                            <small>
                              Starting from
                            </small>

                            <strong>
                              ₹
                              {Number(
                                destination.price
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                          </div>


                          <Link
                            to={`/destinations/${destination.name.toLowerCase()}`}
                            className="wishlist-view-button"
                          >
                            View Details
                            <ArrowRight size={17} />
                          </Link>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          )}

      </section>


      {/* ============================= */}
      {/* CTA */}
      {/* ============================= */}

      <section className="wishlist-cta">

        <div className="wishlist-cta-icon">
          <Plane size={29} />
        </div>

        <div className="wishlist-cta-content">

          <p>
            KEEP EXPLORING
          </p>

          <h2>
            Your next adventure is waiting.
          </h2>

          <span>
            Discover more beautiful destinations
            and add them to your wishlist.
          </span>

        </div>

        <Link
          to="/destinations"
          className="wishlist-cta-button"
        >
          Explore Now
          <ArrowRight size={18} />
        </Link>

      </section>

    </main>
  );
}

export default Wishlist;