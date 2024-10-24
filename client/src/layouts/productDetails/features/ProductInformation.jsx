import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../../../components/StarRating.jsx';
import Icon from '../../../components/icons.jsx';
import PinterestIcon from '../../../components/PinterestIcon.jsx';
import FacebookIcon from '../../../components/FacebookIcon.jsx';
import XIcon from '../../../components/XIcon.jsx';

export default function ProductInformation({
  name,
  category,
  price,
  salePrice,
  rating,
  numberOfRatings,
}) {
  const url = window.location.href; // Get the current page URL to share

  const handleShare = (platform) => {
    let shareUrl = '';
    const text = `Check out this product: ${name} - ${category}`;

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'x':
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank'); // Open the share URL in a new tab
  };

  return (
    <div className="product-info">
      <div className="d-flex align-items-center mb-3">
        <StarRating rating={rating} />
        <a href="#reviews" className="ms-3 text-secondary-hover">
          View all {numberOfRatings} reviews
        </a>
      </div>

      <p className="text-uppercase text-primary fs-6 mb-2">{category}</p>

      <h2 className="mb-3">{name}</h2>

      <p className="mb-4">
        {salePrice ? (
          <>
            <span className="text-attention me-2">${salePrice}</span>
            <span className="text-secondary text-decoration-line-through">
              ${price}
            </span>
          </>
        ) : (
          <span>${price}</span>
        )}
      </p>

      <div className="d-flex gap-3">
        <button
          className="btn btn-link p-0 text-primary"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <FacebookIcon size={'xl'} />
        </button>
        <button
          className="btn btn-link p-0 text-primary"
          onClick={() => handleShare('x')}
          aria-label="Share on X"
        >
          <XIcon size={'xl'} />
        </button>
        <button
          className="btn btn-link p-0 text-primary"
          onClick={() => handleShare('pinterest')}
          aria-label="Share on Pinterest"
        >
          <PinterestIcon size={'xl'} />
        </button>
      </div>
    </div>
  );
}

ProductInformation.propTypes = {
  name: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.string,
  salePrice: PropTypes.string,
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
