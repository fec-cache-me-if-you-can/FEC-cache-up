import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating.jsx';

const ProductDetails = ({ details, renderIcon }) => (
  <>
    <div className="favorite-icon">{renderIcon(details.id)}</div>
    <p className="card-text fw-light h5 text-size-100 mt-0 mb-2">
      {details.category.toUpperCase()}
    </p>
    <h5 className="card-title my-1 text-size-300 fw-semibold two-line-title hover-scale w-75">
      {details.name}
    </h5>
    <p className="text-size-90 my-2">${details.price}</p>
    <StarRating rating={details.rating} />
  </>
);

ProductDetails.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  renderIcon: PropTypes.func.isRequired,
};

export default ProductDetails;
