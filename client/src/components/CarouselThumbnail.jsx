import React from 'react';
import PropTypes from 'prop-types';

const CarouselThumbnail = ({ selected = false, imageUrl }) => {
  return (
    <div
      className={`d-inline-flex ${selected ? 'border-dark border-bottom border-3' : ''}`}
    >
      <div className={`carousel-thumbnail mb-2`}>
        <img
          src={imageUrl}
          className={`img-fluid square border border-dark mb-5`}
          alt="carousel-thumbnail"
        />
      </div>
    </div>
  );
};

CarouselThumbnail.propTypes = {
  selected: PropTypes.bool,
  imageUrl: PropTypes.string,
};

export default CarouselThumbnail;
