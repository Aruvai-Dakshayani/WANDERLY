import {
  Clock3,
  Star,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./PackageCard.css";

function PackageCard({
  id,
  image,
  name,
  duration,
  rating,
  price,
  location,
}) {
  const formattedPrice = Number(price).toLocaleString("en-IN");

  return (
    <article className="package-card">

      {/* Package Image */}
      <div className="package-image">

        <img
          src={image}
          alt={name}
        />

        {/* Rating */}
        <div className="package-rating">
          <Star
            size={15}
            fill="currentColor"
          />
          <span>{rating}</span>
        </div>

        {/* Image Overlay */}
        <div className="package-image-overlay">
          <span>Explore Package</span>
        </div>

      </div>


      {/* Package Content */}
      <div className="package-content">

        <h3>
          {name}
        </h3>


        {/* Location */}
        {location && (
          <div className="package-location">

            <MapPin size={15} />

            <span>
              {location}
            </span>

          </div>
        )}


        {/* Duration */}
        <div className="package-duration">

          <Clock3 size={16} />

          <span>
            {duration}
          </span>

        </div>


        {/* Bottom Section */}
        <div className="package-bottom">

          <div className="package-price">

            <small>
              Starting from
            </small>

            <strong>
              ₹{formattedPrice}
            </strong>

          </div>


          <Link
            to={`/packages/${id}`}
            className="package-view-button"
            state={{
              packageData: {
                id,
                name,
                duration,
                rating,
                price,
                image,
                location,
              },
            }}
          >
            <span>
              View Details
            </span>

            <ArrowRight size={17} />

          </Link>

        </div>

      </div>

    </article>
  );
}

export default PackageCard;