import React from 'react';
import PropTypes from 'prop-types';

export default function Bar({
  totalReviews,
  ratingCount,
  starRating,
  onClick,
  style,
}) {
  const percentage = totalReviews > 0 ? (ratingCount / totalReviews) * 100 : 0;

  return (
    <div
      className="bar-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px',
        ...style,
      }}
    >
      {/* Clickable Star Rating Label */}
      <span
        onClick={onClick}
        className="helpfulness text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
      >
        {starRating} stars
      </span>

      {/* Rating Bar */}
      <div
        className="rating-bar"
        onClick={onClick}
        style={{
          display: 'flex',
          width: '50%',
          height: '8px',
          cursor: 'pointer',
          borderRadius: '4px', // Rounded corners for the bar
          overflow: 'hidden',
        }}
        title={`${starRating} Stars: ${ratingCount} reviews`}
      >
        <div
          className="rating-bar-filled"
          style={{
            width: `${percentage}%`,
            backgroundColor: 'green',
          }}
        ></div>
        <div
          className="rating-bar-empty"
          style={{
            width: `${100 - percentage}%`,
            backgroundColor: 'lightgray',
          }}
        ></div>
      </div>
    </div>
  );
}

Bar.propTypes = {
  totalReviews: PropTypes.number,
  ratingCount: PropTypes.number,
  starRating: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
};
