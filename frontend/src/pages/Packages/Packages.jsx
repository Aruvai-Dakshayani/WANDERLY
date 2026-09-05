import { useEffect, useState } from "react";
import {
  Clock3,
  MapPin,
  Star,
  ArrowRight,
  Search,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import api from "../../api/api";

import "./Packages.css";

function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search")?.toLowerCase().trim() || "";

  const [searchInput, setSearchInput] = useState(searchQuery);

  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch packages and destinations from Django
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [packagesResponse, destinationsResponse] =
          await Promise.all([
            api.get("/packages/"),
            api.get("/destinations/"),
          ]);

        const packageData = packagesResponse.data;
        const destinationData = destinationsResponse.data;

        setDestinations(destinationData);

        // Add destination information to every package
        const updatedPackages = packageData.map((travelPackage) => {
          const destination = destinationData.find(
            (item) => item.id === travelPackage.destination
          );

          return {
            ...travelPackage,
            location: destination
              ? destination.location
              : "India",
          };
        });

        setPackages(updatedPackages);
      } catch (err) {
        console.error("Failed to fetch packages:", err);

        setError(
          "Unable to load packages. Please make sure the Django server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPackages = packages.filter((travelPackage) => {
    if (!searchQuery) {
      return true;
    }

    return (
      travelPackage.name?.toLowerCase().includes(searchQuery) ||
      travelPackage.location?.toLowerCase().includes(searchQuery)
    );
  });

  const handleSearch = (e) => {
    e.preventDefault();

    const value = searchInput.trim();

    if (value) {
      setSearchParams({
        search: value,
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="packages-page">

      {/* HERO */}

      <section className="packages-hero">

        <div className="packages-hero-content">

          <p className="packages-hero-label">
            TRAVEL WITH WANDERLY
          </p>

          <h1>
            Explore Our
            <span> Travel Packages</span>
          </h1>

          <p className="packages-hero-description">
            Choose from carefully designed travel packages
            and create unforgettable memories with Wanderly.
          </p>

          <form
            className="packages-search"
            onSubmit={handleSearch}
          >

            <Search size={21} />

            <input
              type="text"
              placeholder="Search packages..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />

            <button type="submit">
              Search
            </button>

          </form>

        </div>

      </section>


      {/* PACKAGES */}

      <section className="packages-container">

        <div className="packages-header">

          <div>

            <p className="section-subtitle">
              DISCOVER YOUR JOURNEY
            </p>

            <h2>
              Popular Travel Packages
            </h2>

            <p className="section-description">
              Find the perfect package for your next adventure.
            </p>

          </div>

          <div className="package-count">

            <strong>
              {loading ? "..." : filteredPackages.length}
            </strong>

            <span>
              Packages
            </span>

          </div>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="no-package-results">

            <Search size={42} />

            <h3>
              Loading packages...
            </h3>

            <p>
              Please wait while we load the latest travel packages.
            </p>

          </div>

        ) : error ? (

          /* ERROR */

          <div className="no-package-results">

            <Search size={42} />

            <h3>
              Unable to load packages
            </h3>

            <p>
              {error}
            </p>

          </div>

        ) : filteredPackages.length === 0 ? (

          /* NO RESULTS */

          <div className="no-package-results">

            <Search size={42} />

            <h3>
              No packages found
            </h3>

            <p>
              We couldn't find a package matching "{searchQuery}".
            </p>

            <button
              onClick={() => {
                setSearchInput("");
                setSearchParams({});
              }}
            >
              View All Packages
            </button>

          </div>

        ) : (

          /* PACKAGE GRID */

          <div className="packages-grid">

            {filteredPackages.map((travelPackage) => (

              <article
                className="package-card"
                key={travelPackage.id}
              >

                {/* IMAGE */}

                <div className="package-image">

                  <img
                    src={travelPackage.image}
                    alt={travelPackage.name}
                  />

                  <div className="package-rating">

                    <Star
                      size={15}
                      fill="currentColor"
                    />

                    {travelPackage.rating}

                  </div>

                </div>


                {/* CONTENT */}

                <div className="package-content">

                  <div className="package-location">

                    <MapPin size={16} />

                    <span>
                      {travelPackage.location}
                    </span>

                  </div>

                  <h3>
                    {travelPackage.name}
                  </h3>

                  <p>
                    {travelPackage.description}
                  </p>


                  <div className="package-duration">

                    <Clock3 size={16} />

                    <span>
                      {travelPackage.duration}
                    </span>

                  </div>


                  <div className="package-bottom">

                    <div className="package-price">

                      <small>
                        Starting from
                      </small>

                      <strong>
                        ₹
                        {Number(
                          travelPackage.price
                        ).toLocaleString("en-IN")}
                      </strong>

                      <span>
                        per traveler
                      </span>

                    </div>


                    <Link
                      to={`/packages/${travelPackage.id}`}
                      state={{
                        packageData: travelPackage,
                      }}
                      className="package-view-button"
                    >
                      View Details

                      <ArrowRight size={17} />

                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* CTA */}

      <section className="packages-cta">

        <div className="packages-cta-content">

          <p>
            START YOUR JOURNEY
          </p>

          <h2>
            Your Next Adventure Awaits
          </h2>

          <span>
            Choose a package and start creating unforgettable memories.
          </span>

          <Link
            to="/destinations"
            className="packages-cta-button"
          >
            Explore Destinations

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

    </main>
  );
}

export default Packages;