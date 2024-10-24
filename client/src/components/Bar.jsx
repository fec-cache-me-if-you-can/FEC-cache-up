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
      className="d-flex align-items-center gap-3 mb-2 py-2 rounded-2"
      style={style}
    >
      {/* Clickable Star Rating Label */}
      <button
        onClick={onClick}
        className="btn btn-link text-secondary p-0 text-decoration-underline fs-6 flex-nowrap"
      >
        {starRating} stars
      </button>

      {/* Rating Bar */}
      <div
        className="rating-bar position-relative flex-grow-1"
        onClick={onClick}
        title={`${starRating} Stars: ${ratingCount} reviews`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onClick();
          }
        }}
      >
        <div
          className="rating-bar-filled"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="rating-bar-empty"
          style={{ width: `${100 - percentage}%` }}
        />
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
