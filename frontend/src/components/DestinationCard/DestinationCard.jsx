import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./DestinationCard.css";

function DestinationCard({
  image,
  name,
  location,
  price,
}) {
  const formattedPrice = Number(price).toLocaleString("en-IN");

  return (
    <article className="destination-card">

      {/* IMAGE */}

      <div className="destination-card-image-wrapper">

        <img
          src={image}
          alt={name}
          className="destination-image"
        />

        <div className="destination-image-overlay">
          <span>Explore</span>
        </div>

      </div>


      {/* CONTENT */}

      <div className="destination-content">

        <h3>
          {name}
        </h3>


        <p className="destination-location">

          <MapPin size={16} />

          <span>
            {location}
          </span>

        </p>


        <div className="destination-card-bottom">

          <div className="destination-price">

            <span>
              Starting from
            </span>

            <strong>
              ₹{formattedPrice}
            </strong>

          </div>


          <Link
            to={`/destinations/${name.toLowerCase()}`}
            className="destination-view-button"
          >
            <span>
              View
            </span>

            <ArrowRight size={17} />

          </Link>

        </div>

      </div>

    </article>
  );
}

export default DestinationCard;