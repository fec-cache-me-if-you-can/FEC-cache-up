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
      className={`thumbnail-container ${isSelected ? 'selected' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <img
        src={url}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '35px',
          border: isSelected ? '2px solid blue' : '1px solid grey',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {isSelected && (
        <div style={checkmarkNoteStyle}>
          <CheckmarkNote label="Selected" />
        </div>
      )}

      {isHovered && (
        <div className="hover-name" style={hoverNameStyle}>
          {name}
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
