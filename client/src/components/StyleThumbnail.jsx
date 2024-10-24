import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckmarkNote from './CheckmarkNote.jsx';
import Icon from './icons.jsx';

export default function StyleThumbnail({
  name,
  url,
  isSelected = false,
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 hover-scale"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="rounded-circle overflow-hidden position-absolute top-0 start-0 w-100 h-100">
        <img src={url} alt={name} className="w-100 h-100 object-fit-cover" />
      </div>
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 rounded-circle ${
          isSelected
            ? 'border border-5 border-attention'
            : 'border border-secondary'
        }`}
        style={{ zIndex: 1 }}
      ></div>

      {isSelected && (
        <div
          className="position-absolute top-0 end-0 p-1"
          style={{ zIndex: 2 }}
        >
          <CheckmarkNote label="Selected" />
        </div>
      )}

      {isHovered && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-circle"
          style={{ zIndex: 1 }}
        >
          <small
            className="text-white text-center fw-semibold px-3 py-1"
            style={{ fontSize: '0.7rem' }}
          >
            {name}
          </small>
        </div>
      )}
    </div>
  );
}

const checkmarkNoteStyle = {
  position: 'absolute',
  top: '-5px',
  right: '-5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  color: '#AB1B38',
};

const hoverNameStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  textAlign: 'center',
  padding: '5px',
  boxSizing: 'border-box',
  fontSize: '12px',
};

StyleThumbnail.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};
