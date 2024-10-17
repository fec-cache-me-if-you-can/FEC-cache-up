import React from 'react';
import PropTypes from 'prop-types';

const CarouselThumbnail = ({ selected = false, imageUrl, onClick }) => {
  return (
    <div
      className={`carousel-thumbnail ${selected ? 'border-dark border-bottom border-3' : ''}`}
      onClick={onClick}
      style={{
        width: '70px',
        height: '70px',
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        margin: '10px',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '5px',
        }}
      >
        <img
          src={imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          className={`border ${selected ? 'border-dark' : 'border-light'}`}
          alt="carousel-thumbnail"
        />
      </div>
    </div>
  );
};

CarouselThumbnail.propTypes = {
  selected: PropTypes.bool,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default CarouselThumbnail;
