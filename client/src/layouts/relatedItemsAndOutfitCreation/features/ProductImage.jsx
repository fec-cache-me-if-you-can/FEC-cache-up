// ProductImage.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ProductImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="card-img-top object-fit-cover square"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '../../../assets/images/placeholder.jpeg';
    }}
  />
);

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ProductImage;
