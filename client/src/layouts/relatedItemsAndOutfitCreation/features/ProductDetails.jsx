import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating.jsx';
import FavoriteToggle from './favoriteToggle.jsx';

const ProductDetails = ({ productDetails }) => (
  <>
    <div className="favorite-icon">
      <FavoriteToggle productId={productDetails.id} />
    </div>
    <p className="card-text fw-light text-uppercase mt-0 mb-2 fs-6 fs-md-5 fs-lg-4">
      {productDetails.category}
    </p>
    <h5 className="card-title my-1 fw-semibold two-line-title hover-scale fs-5 fs-md-4 fs-lg-3">
      {productDetails.name}
    </h5>
    <p className="mt-1 fs-6 fs-md-5 fs-lg-4">${productDetails.price}</p>
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
