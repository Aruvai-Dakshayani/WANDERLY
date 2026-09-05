import { useEffect, useState } from "react";

import {
  Heart,
  MapPin,
  Star,
  ArrowLeft,
  CalendarDays,
  Users,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../../api/api";

import "./DestinationDetails.css";


function DestinationDetails() {

  const { name } = useParams();

  const navigate = useNavigate();


  /* =========================================
     DESTINATION
  ========================================= */

  const [destination, setDestination] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================================
     WISHLIST
  ========================================= */

  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const [wishlistId, setWishlistId] =
    useState(null);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);


  /* =========================================
     LOAD DESTINATION
  ========================================= */

  useEffect(() => {

    const fetchDestination = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await api.get("/destinations/");

        const foundDestination =
          response.data.find(
            (item) =>
              item.name.toLowerCase() ===
              name?.toLowerCase()
          );

        if (!foundDestination) {

          setError(
            "Destination not found."
          );

          return;
        }

        setDestination(foundDestination);

      } catch (err) {

        console.error(
          "Failed to load destination:",
          err
        );

        setError(
          "Unable to load destination details."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDestination();

  }, [name]);


  /* =========================================
     CHECK WISHLIST
  ========================================= */

  useEffect(() => {

    const checkWishlist = async () => {

      if (!destination) {
        return;
      }

      const accessToken =
        localStorage.getItem(
          "accessToken"
        );

      if (!accessToken) {

        setIsWishlisted(false);
        setWishlistId(null);

        return;
      }

      try {

        const response =
          await api.get("/wishlist/");

        const existingItem =
          response.data.find(
            (item) =>
              Number(item.destination) ===
              Number(destination.id)
          );

        if (existingItem) {

          setIsWishlisted(true);
          setWishlistId(
            existingItem.id
          );

        } else {

          setIsWishlisted(false);
          setWishlistId(null);

        }

      } catch (err) {

        console.error(
          "Failed to check wishlist:",
          err
        );

      }

    };

    checkWishlist();

  }, [destination]);


  /* =========================================
     WISHLIST TOGGLE
  ========================================= */

  const handleWishlist = async () => {

    if (!destination) {
      return;
    }

    const accessToken =
      localStorage.getItem(
        "accessToken"
      );

    if (!accessToken) {

      alert(
        "Please login to add destinations to your wishlist."
      );

      navigate("/login");

      return;
    }

    try {

      setWishlistLoading(true);


      /* REMOVE */

      if (
        isWishlisted &&
        wishlistId
      ) {

        await api.delete(
          `/wishlist/${wishlistId}/`
        );

        setIsWishlisted(false);
        setWishlistId(null);

        alert(
          `${destination.name} removed from your wishlist.`
        );

        return;
      }


      /* ADD */

      const response =
        await api.post(
          "/wishlist/",
          {
            destination:
              destination.id,
          }
        );

      setIsWishlisted(true);

      setWishlistId(
        response.data.id
      );

      alert(
        `${destination.name} added to your wishlist!`
      );

    } catch (err) {

      console.error(
        "Wishlist error:",
        err
      );


      if (
        err.response?.status === 401
      ) {

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        alert(
          "Your session has expired. Please login again."
        );

        navigate("/login");

        return;
      }


      if (
        err.response?.status === 400
      ) {

        setIsWishlisted(true);

        alert(
          `${destination.name} is already in your wishlist.`
        );

        return;
      }


      alert(
        "Unable to update your wishlist."
      );

    } finally {

      setWishlistLoading(false);

    }

  };


  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (
      <main className="destination-details-page">

        <div className="destination-details-loading">

          <h2>
            Loading destination...
          </h2>

          <p>
            Please wait while we load the destination.
          </p>

        </div>

      </main>
    );

  }


  /* =========================================
     ERROR
  ========================================= */

  if (error || !destination) {

    return (
      <main className="destination-details-page">

        <div className="destination-details-error">

          <h2>
            {error || "Destination not found"}
          </h2>

          <Link
            to="/destinations"
            className="back-destinations-button"
          >
            <ArrowLeft size={18} />
            Back to Destinations
          </Link>

        </div>

      </main>
    );

  }


  const formattedPrice =
    Number(destination.price)
      .toLocaleString("en-IN");


  /* =========================================
     PAGE
  ========================================= */

  return (

    <main className="destination-details-page">

      {/* =====================================
          BACK BUTTON
      ===================================== */}

      <div className="destination-details-container">

        <Link
          to="/destinations"
          className="back-destinations-button"
        >
          <ArrowLeft size={18} />
          Back to Destinations
        </Link>


        {/* =====================================
            HERO IMAGE
        ===================================== */}

        <section className="destination-details-hero">

          <img
            src={destination.image}
            alt={destination.name}
          />

          <button
            type="button"
            className={`destination-details-wishlist ${
              isWishlisted
                ? "active"
                : ""
            }`}
            onClick={handleWishlist}
            disabled={wishlistLoading}
          >

            <Heart
              size={23}
              fill={
                isWishlisted
                  ? "currentColor"
                  : "none"
              }
            />

            {isWishlisted
              ? "Saved"
              : "Save to Wishlist"}

          </button>

        </section>


        {/* =====================================
            CONTENT
        ===================================== */}

        <section className="destination-details-content">

          <div className="destination-details-main">

            {/* LOCATION */}

            <div className="destination-details-location">

              <MapPin size={18} />

              <span>
                {destination.location}
              </span>

            </div>


            {/* TITLE */}

            <h1>
              {destination.name}
            </h1>


            {/* RATING */}

            <div className="destination-details-rating">

              <Star
                size={19}
                fill="currentColor"
              />

              <strong>
                {destination.rating}
              </strong>

              <span>
                ({destination.reviews} reviews)
              </span>

            </div>


            {/* DESCRIPTION */}

            <div className="destination-details-description">

              <h2>
                About {destination.name}
              </h2>

              <p>
                {destination.description}
              </p>

            </div>


            {/* INFORMATION */}

            <div className="destination-details-info">

              <div className="details-info-item">

                <MapPin size={21} />

                <div>
                  <span>
                    Location
                  </span>

                  <strong>
                    {destination.location}
                  </strong>
                </div>

              </div>


              <div className="details-info-item">

                <CalendarDays size={21} />

                <div>
                  <span>
                    Best Experience
                  </span>

                  <strong>
                    Explore & Discover
                  </strong>
                </div>

              </div>


              <div className="details-info-item">

                <Users size={21} />

                <div>
                  <span>
                    Travelers
                  </span>

                  <strong>
                    Solo, Couple & Family
                  </strong>
                </div>

              </div>

            </div>

          </div>


          {/* =====================================
              BOOKING CARD
          ===================================== */}

          <aside className="destination-details-booking">

            <span className="booking-label">
              STARTING FROM
            </span>

            <div className="booking-price">
              ₹{formattedPrice}
            </div>

            <span className="booking-per-person">
              per traveler
            </span>


            <div className="booking-rating">

              <Star
                size={17}
                fill="currentColor"
              />

              <strong>
                {destination.rating}
              </strong>

              <span>
                Excellent rating
              </span>

            </div>


            <button
              type="button"
              className="book-now-button"
              onClick={() => {

                navigate("/booking", {
                  state: {
                    destination: {
                      ...destination,
                      price: `₹${formattedPrice}`,
                    },
                  },
                });

              }}
            >
              Book Now
            </button>


            <Link
              to="/packages"
              className="view-packages-button"
            >
              View Travel Packages
            </Link>

          </aside>

        </section>

      </div>

    </main>

  );

}


export default DestinationDetails;