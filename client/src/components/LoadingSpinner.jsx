import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = '24', color = 'currentColor' }) => (
  <svg
    data-testid="loading-spinner"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    style={{ display: 'block', margin: 'auto' }}
  >
    <style>
      {`
        .spinner {
          transform-origin: center;
          animation: spinner-animation 0.75s step-end infinite;
        }
        @keyframes spinner-animation {
          8.3% { transform: rotate(30deg); }
          16.6% { transform: rotate(60deg); }
          25% { transform: rotate(90deg); }
          33.3% { transform: rotate(120deg); }
          41.6% { transform: rotate(150deg); }
          50% { transform: rotate(180deg); }
          58.3% { transform: rotate(210deg); }
          66.6% { transform: rotate(240deg); }
          75% { transform: rotate(270deg); }
          83.3% { transform: rotate(300deg); }
          91.6% { transform: rotate(330deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
    <g data-testid="spinner-group" className="spinner">
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        opacity=".14"
      />
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        opacity=".14"
      />
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        transform="rotate(30 12 12)"
        opacity=".29"
      />
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        transform="rotate(60 12 12)"
        opacity=".43"
      />
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        transform="rotate(90 12 12)"
        opacity=".57"
      />
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        transform="rotate(120 12 12)"
        opacity=".71"
      />
      <rect
        data-testid="spinner-rectangle"
        x="11"
        y="1"
        width="2"
        height="5"
        transform="rotate(150 12 12)"
        opacity=".86"
      />
      <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
    </g>
  </svg>
);
LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default LoadingSpinner;
