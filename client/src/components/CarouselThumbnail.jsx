import React from 'react';
import PropTypes from 'prop-types';

const CarouselThumbnail = ({ selected = false, imageUrl, onClick }) => {
  return (
    <div

      onClick={onClick}
      style={{
        width: '70px',
        height: '70px',
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        margin: '10px',
        borderBottom: selected ? '2px solid #AB1B38'  : 'none'
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
            border: selected ? '2px solid #AB1B38'  : 'none'
          }}

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
