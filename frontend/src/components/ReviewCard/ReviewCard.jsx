import { Star } from "lucide-react";
import "./ReviewCard.css";

function ReviewCard({ name, location, review, rating }) {
  return (
    <article className="review-card">

      <div className="review-stars">
        {Array.from({ length: rating }).map((_, index) => (
          <Star
            key={index}
            size={18}
            fill="currentColor"
          />
        ))}
      </div>

      <p className="review-text">
        "{review}"
      </p>

      <div className="review-user">

        <div className="review-avatar">
          {name.charAt(0)}
        </div>

        <div>
          <h4>{name}</h4>
          <p>{location}</p>
        </div>

      </div>

    </article>
  );
}

export default ReviewCard;