import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icons';

const StarRating = ({ stars }) => {
  const totalStars = 5;
  const filledStars = Math.min(Math.max(stars, 0), totalStars);

  return (
    <div className="d-flex align-items-center">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className="me-1">
          {index < filledStars ? (
            <Icon icon="fa-star" />
          ) : (
            <Star className="text-secondary" />
          )}
        </span>
      ))}
      <span className="ms-2 text-muted">{filledStars.toFixed(1)}</span>
    </div>
  );
};

StarRating.propTypes = {
  stars: PropTypes.number,
};

export default StarRating;
