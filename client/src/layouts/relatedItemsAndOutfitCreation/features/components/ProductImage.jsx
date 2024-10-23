import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '@/assets/public/placeholder.jpeg';

const ProductImage = ({ src, alt = ''}) => {
  const validSrc = src || placeholder;

  return (
    <img
      src={validSrc}
      alt={alt}
      className="card-img-top object-fit-cover square img"
    />
  );
};

ProductImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default ProductImage;
