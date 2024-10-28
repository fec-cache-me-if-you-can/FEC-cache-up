import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '@/components/StarRating.jsx';

const ProductDetails = ({ details, renderIcon, setProductId }) => {
  const handleTitleClick = () => {
    setProductId(details.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-2">
      <div className="favorite-icon">{renderIcon(details.id)}</div>
      <p className="card-text fw-light h5 text-size-100 mt-0 mb-2">
        {(details.category || '').toUpperCase()}
      </p>
      <button
        className="card-title my-1 text-size-200 fw-semibold two-line-title hover-scale w-75"
        onClick={handleTitleClick}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          textAlign: 'left',
        }}
      >
        {details.name || 'N/A'}
      </button>
      <p className="text-size-90 my-2">
        ${details.sale || details.price}
        {details.sale && (
          <span className="discount-slash"> ${details.price}</span>
        )}
      </p>
      <StarRating rating={details.rating} />
    </div>
  );
};

ProductDetails.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.number,
    sale: PropTypes.string,
  }),
  renderIcon: PropTypes.func,
  setProductId: PropTypes.func,
};

export default ProductDetails;
