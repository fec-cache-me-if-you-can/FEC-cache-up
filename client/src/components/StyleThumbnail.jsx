import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckmarkNote from './CheckmarkNote.jsx';

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
        <div className="p-1" style={checkmarkNoteStyle}>
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
  top: '3px',
  right: '3px',
  zIndex: 1,
  color: 'var(--bs-black)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '50%',
  border: '1px solid rgba(20, 20, 20)',
};

StyleThumbnail.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};
