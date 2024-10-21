import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PLACEHOLDER = '/assets/public/placeholder.jpeg';

const ProductImage = ({
  src = '',
  alt = '',
  placeholder = DEFAULT_PLACEHOLDER,
}) => {
  const validSrc = src || placeholder;

  return (
    <img
      src={validSrc}
      alt={alt}
      className="card-img-top object-fit-cover square"
    />
  );
};

ProductImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  placeholder: PropTypes.string,
};

export default ProductImage;
