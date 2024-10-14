import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating.jsx';
import FavoriteToggle from './favoriteToggle.jsx';

const ProductDetails = ({ productDetails }) => (
  <>
    <div className="favorite-icon">
      <FavoriteToggle productId={productDetails.id} />
    </div>
    <p className="card-text fw-light h5 text-size-100 mt-0 mb-2">
      {productDetails.category.toUpperCase()}
    </p>
    <h5 className="card-title my-1 text-size-300 fw-semibold two-line-title hover-scale">
      {productDetails.name}
    </h5>
    <p className="text-size-90 my-2">${productDetails.price}</p>
    <StarRating rating={productDetails.rating} />
  </>
);

ProductDetails.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetails;
