import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating.jsx';

export default function ProductInformation({
  name,
  category,
  price,
  rating,
  numberOfRatings,
}) {
  return (
    <div>
      <StarRating rating={rating} />
      <a href="#ratings"> View all {numberOfRatings} reviews </a>
      <p>{category}</p>
      <h2>{name}</h2>
      <p>$ {price}</p>
    </div>
  );
}

ProductInformation.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
