import React from 'react';
import PropTypes from 'prop-types';

const CarouselThumbnail = ({ selected = false, imageUrl, onClick }) => {
  return (
    <div className="d-inline-block m-2">
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        className="d-inline-block position-relative overflow-visible hover-scale"
        style={{
          width: '70px',
          height: '70px',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onClick();
          }
        }}
      >
        <img
          src={imageUrl}
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
          alt="carousel-thumbnail"
        />
        <div
          className="position-absolute w-100"
          style={{
            height: '5px',
            bottom: '-10px',
          }}
        >
          <div
            className="h-100 bg-attention"
            style={{
              width: selected ? '100%' : '0%',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </div>
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
