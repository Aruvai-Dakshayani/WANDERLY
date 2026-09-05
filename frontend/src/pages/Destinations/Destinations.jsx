import { useEffect, useState } from "react";

import {
  Search,
  Heart,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import api from "../../api/api";

import "./Destinations.css";


function Destinations() {

  /* =========================================
     NAVIGATION
  ========================================= */

  const navigate = useNavigate();


  /* =========================================
     SEARCH PARAMETER
  ========================================= */

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search")?.toLowerCase().trim() || "";

  const [searchInput, setSearchInput] =
    useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);


  /* =========================================
     DESTINATIONS FROM DJANGO API
  ========================================= */

  const [destinations, setDestinations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {

    const fetchDestinations = async () => {

      try {

        setLoading(true);
        setError("");

        const response =
          await api.get("/destinations/");

        setDestinations(response.data);

      } catch (err) {

        console.error(
          "Failed to fetch destinations:",
          err
        );

        setError(
          "Unable to load destinations. Please make sure the Django server is running."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDestinations();

  }, []);


  /* =========================================
     WISHLIST FROM DJANGO
  ========================================= */

  const [wishlist, setWishlist] =
    useState([]);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);


  /*
   * Load the logged-in user's wishlist
   */
  useEffect(() => {

    const fetchWishlist = async () => {

      const accessToken =
        localStorage.getItem("accessToken");

      if (!accessToken) {
        setWishlist([]);
        return;
      }

      try {

        const response =
          await api.get("/wishlist/");

        setWishlist(response.data);

      } catch (err) {

        console.error(
          "Failed to fetch wishlist:",
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

          setWishlist([]);

        }

      }

    };

    fetchWishlist();

  }, []);


  /* =========================================
     FILTER DESTINATIONS
  ========================================= */

  const filteredDestinations =
    destinations.filter(
      (destination) => {

        if (!searchQuery) {
          return true;
        }

        return (
          destination.name
            ?.toLowerCase()
            .includes(searchQuery) ||

          destination.location
            ?.toLowerCase()
            .includes(searchQuery)
        );

      }
    );


  /* =========================================
     CHECK WISHLIST
  ========================================= */

 const isDestinationWishlisted = (destinationId) => {
  return wishlist.some(
    (item) => Number(item.destination) === Number(destinationId)
  );
};


  /* =========================================
     GET WISHLIST ID
  ========================================= */

  const getWishlistId = (destinationId) => {
  const item = wishlist.find(
    (wishlistItem) =>
      Number(wishlistItem.destination) === Number(destinationId)
  );

  return item?.id || null;
};


  /* =========================================
     TOGGLE WISHLIST
  ========================================= */

  const toggleWishlist =
    async (destination) => {

      const accessToken =
        localStorage.getItem(
          "accessToken"
        );

      /*
       * Login required
       */

      if (!accessToken) {

        alert(
          "Please login to add destinations to your wishlist."
        );

        navigate("/login");

        return;
      }


      try {

        setWishlistLoading(true);


        const alreadySaved =
          isDestinationWishlisted(
            destination.id
          );


        /* =====================================
           REMOVE FROM WISHLIST
        ===================================== */

        if (alreadySaved) {

          const wishlistId =
            getWishlistId(
              destination.id
            );

          if (wishlistId) {

            await api.delete(
              `/wishlist/${wishlistId}/`
            );

          }


          setWishlist(
            (currentWishlist) =>
              currentWishlist.filter(
                (item) =>
                  item.id !== wishlistId
              )
          );


          alert(
            `${destination.name} removed from your wishlist.`
          );

          return;
        }


        /* =====================================
           ADD TO WISHLIST
        ===================================== */

        const response =
          await api.post(
            "/wishlist/",
            {
              destination:
                destination.id,
            }
          );


        setWishlist(
          (currentWishlist) => [
            ...currentWishlist,
            response.data,
          ]
        );


        alert(
          `${destination.name} added to your wishlist!`
        );


      } catch (err) {

        console.error(
          "Wishlist error:",
          err
        );


        /* =====================================
           SESSION EXPIRED
        ===================================== */

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


        /* =====================================
           DUPLICATE ITEM
        ===================================== */

        if (
          err.response?.status === 400
        ) {

          alert(
            `${destination.name} is already in your wishlist.`
          );

          /*
           * Refresh wishlist from Django
           */

          try {

            const response =
              await api.get(
                "/wishlist/"
              );

            setWishlist(
              response.data
            );

          } catch (refreshError) {

            console.error(
              "Failed to refresh wishlist:",
              refreshError
            );

          }

          return;
        }


        alert(
          "Unable to update your wishlist. Please try again."
        );

      } finally {

        setWishlistLoading(false);

      }

    };


  /* =========================================
     RETURN
  ========================================= */

  return (

    <main className="destinations-page">


      {/* =====================================
          HERO
      ===================================== */}

      <section className="destinations-hero">

        <div className="destinations-hero-content">

          <p className="destinations-hero-label">
            EXPLORE THE WORLD
          </p>

          <h1>
            Discover Your{" "}
            <span>Perfect Destination</span>
          </h1>

          <p className="destinations-hero-description">
            Explore beautiful places, unforgettable
            experiences, and exciting adventures with Wanderly.
          </p>


          {/* SEARCH */}

          <form
            className="destination-search"

            onSubmit={(e) => {

              e.preventDefault();

              const value =
                searchInput.trim();

              if (value) {

                setSearchParams({
                  search: value,
                });

              } else {

                setSearchParams({});

              }

            }}
          >

            <Search size={21} />

            <input
              type="text"
              placeholder="Search destinations..."
              value={searchInput}

              onChange={(e) => {
                setSearchInput(
                  e.target.value
                );
              }}
            />

            <button type="submit">
              Search
            </button>

          </form>

        </div>

      </section>


      {/* =====================================
          DESTINATION CONTENT
      ===================================== */}

      <section className="destinations-container">


        {/* HEADER */}

        <div className="destinations-header">

          <div>

            <p className="section-subtitle">
              TRAVEL WITH WANDERLY
            </p>

            <h2>
              {searchQuery
                ? "Search Results"
                : "Popular Destinations"}
            </h2>

            <p className="section-description">

              {searchQuery
                ? `Showing destinations matching "${searchQuery}"`
                : "Find your next adventure from our most-loved destinations."}

            </p>

          </div>


          {/* RESULT COUNT */}

          <div className="destination-count">

            <strong>
              {filteredDestinations.length}
            </strong>

            <span>
              {filteredDestinations.length === 1
                ? "Destination"
                : "Destinations"}
            </span>

          </div>

        </div>


        {/* =================================
            LOADING
        ================================= */}

        {loading && (

          <div className="no-search-results">

            <h3>
              Loading destinations...
            </h3>

            <p>
              Please wait while we load the latest destinations.
            </p>

          </div>

        )}


        {/* =================================
            ERROR
        ================================= */}

        {!loading && error && (

          <div className="no-search-results">

            <div className="no-results-icon">

              <Search size={42} />

            </div>

            <h3>
              Unable to load destinations
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* =================================
            NO RESULTS
        ================================= */}

        {!loading &&
          !error &&
          filteredDestinations.length === 0 && (

            <div className="no-search-results">

              <div className="no-results-icon">

                <Search size={42} />

              </div>

              <h3>
                No destinations found
              </h3>

              <p>
                We couldn't find a destination
                matching "{searchQuery}".
              </p>

              <p className="no-results-hint">
                Try searching for Goa, Kerala,
                Manali, Kashmir, Jaipur or Andaman.
              </p>

              <button
                type="button"
                className="cta-explore-button"

                onClick={() => {

                  setSearchParams({});

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });

                }}
              >

                Explore All Destinations

                <ArrowRight size={18} />

              </button>

            </div>

          )}


        {/* =================================
            DESTINATION GRID
        ================================= */}

        {!loading &&
          !error &&
          filteredDestinations.length > 0 && (

            <div className="destinations-grid">

              {filteredDestinations.map(
                (destination) => (

                  <article
                    className="destination-card"
                    key={destination.id}
                  >


                    {/* =========================
                        IMAGE
                    ========================= */}

                    <div
  className="destination-image"
  onDoubleClick={() => toggleWishlist(destination)}
  title="Double-click image to add/remove from wishlist"
>

                      <img
                        src={destination.image}
                        alt={destination.name}
                      />


                      {/* =========================
                          WISHLIST
                      ========================= */}

                      <button
                        type="button"

                        className={`favorite-button ${
                          isDestinationWishlisted(
                            destination.id
                          )
                            ? "active"
                            : ""
                        }`}

                        onClick={() =>
                          toggleWishlist(
                            destination
                          )
                        }

                        disabled={
                          wishlistLoading
                        }

                        aria-label={
                          isDestinationWishlisted(
                            destination.id
                          )
                            ? `Remove ${destination.name} from wishlist`
                            : `Add ${destination.name} to wishlist`
                        }
                      >

                        <Heart
                          size={19}

                          fill={
                            isDestinationWishlisted(
                              destination.id
                            )
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>


                      {/* RATING */}

                      <div className="rating">

                        <Star
                          size={15}
                          fill="currentColor"
                        />

                        <span>
                          {destination.rating}
                        </span>

                      </div>

                    </div>


                    {/* =========================
                        CARD CONTENT
                    ========================= */}

                    <div className="destination-card-content">


                      {/* LOCATION */}

                      <div className="location">

                        <MapPin size={16} />

                        <span>
                          {destination.location}
                        </span>

                      </div>


                      {/* NAME */}

                      <h3>
                        {destination.name}
                      </h3>


                      {/* DESCRIPTION */}

                      <p>
                        {destination.description}
                      </p>


                      {/* CARD BOTTOM */}

                      <div className="destination-card-bottom">


                        {/* PRICE */}

                        <div className="destination-price">

                          <span>
                            Starting from
                          </span>

                          <strong>
                            ₹
                            {Number(
                              destination.price
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          <small>
                            / traveler
                          </small>

                        </div>


                        {/* EXPLORE */}

                        <Link
                          to={`/destinations/${destination.name.toLowerCase()}`}
                          className="explore-button"
                        >

                          Explore

                          <ArrowRight size={16} />

                        </Link>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

      </section>


      {/* =====================================
          BOTTOM CTA
      ===================================== */}

      <section className="destinations-cta">

        <div className="destinations-cta-content">

          <p>
            START YOUR JOURNEY
          </p>

          <h2>
            Your Next Adventure Awaits
          </h2>

          <span>
            Explore our destinations and discover
            a place you'll never forget.
          </span>

          <Link
            to="/destinations"
            className="cta-explore-button"
          >

            Explore All Destinations

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

    </main>

  );

}


export default Destinations;