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
    <div>
      <StarRating rating={rating} />
      <a href="#ratings" style={{ marginLeft: '10px' }}>
        View all {numberOfRatings} reviews{' '}
      </a>
      <p>{category}</p>
      <h2>{name}</h2>
      <p>$ {price}</p>

      {/* Social Media Share Buttons */}
      <div
        className="share-icons cursor-pointer"
        style={{ display: 'flex', gap: '10px' }}
      >
        <span onClick={() => handleShare('facebook')}>
          <FacebookIcon size={'xl'} />
        </span>
        <span onClick={() => handleShare('x')}>
          <XIcon size={'xl'} />
        </span>
        <span onClick={() => handleShare('pinterest')}>
          <PinterestIcon size={'xl'} />
        </span>
      </div>
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
