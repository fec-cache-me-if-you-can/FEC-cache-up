import React from 'react';
import StarRating from '../../../components/StarRating.jsx';
import PropTypes from 'prop-types';

export default function RatingsBreakdown({ rating, numberOfRatings }) {
  rating = Math.round(rating * 10) / 10;
  return (
    <div>
      RatingsBreakdown
      <h1>{rating}</h1> <StarRating rating={rating} />
    </div>
  );
}

RatingsBreakdown.propTypes = {
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
