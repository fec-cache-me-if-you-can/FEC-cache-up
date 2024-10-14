import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
  const stars = [];
  const totalStars = 5;

  // Ensure rating is between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, rating));

  for (let i = 0; i < totalStars; i++) {
    const difference = clampedRating - i;
    let percentage = 0;

    if (difference > 0) {
      if (difference >= 1) percentage = 100;
      else if (difference >= 0.75) percentage = 75;
      else if (difference >= 0.5) percentage = 50;
      else if (difference >= 0.25) percentage = 25;
    }

    stars.push(
      <div key={i} className="star-wrapper">
        <FontAwesomeIcon
          icon="fa-solid fa-star fa-sharp fa-xs"
          className="star-back"
        />
        <FontAwesomeIcon
          icon="fa-solid fa-star fa-sharp fa-xs"
          className="star-front"
          style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }}
        />
      </div>,
    );
  }

  return <div className="star-rating">{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number,
};
export default StarRating;
