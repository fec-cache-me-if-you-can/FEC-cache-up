import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function StyleThumbnail({ name, url, plus = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`thumbnail-container ${plus ? 'selected' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block', margin: '10px' }}
    >
      <img
        src={url}
        alt={name}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '5px',
          border: plus ? '2px solid blue' : '1px solid grey',
        }}
      />

      {plus && (
        <div className="checkmark" style={checkmarkStyle}>
          ✔
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

const checkmarkStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  backgroundColor: 'white',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  color: 'green',
  border: '2px solid green',
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
  plus: PropTypes.bool,
};
