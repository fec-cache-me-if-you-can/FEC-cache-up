import React from 'react';
import StarRating from '../../../components/StarRating.jsx';
import Bar from '../../../components/Bar.jsx';
import PropTypes from 'prop-types';

export default function RatingsBreakdown({
  rating,
  numberOfRatings,
  metaReviews,
}) {
  rating = Math.round(rating * 10) / 10;
  console.log('meta reviews:', metaReviews);
  const recommended =
    numberOfRatings > 0
      ? (Math.round(
          (metaReviews?.recommended?.['true'] / numberOfRatings) * 100,
        ) *
          10) /
        10
      : 0;

  const handleStarFilter = () => {};

  return (
    <div>
      RatingsBreakdown
      <div className="rating-breakdown">
        <h1>{rating}</h1>
        <StarRating rating={rating} />
      </div>
      <div>{recommended}% of reviews recommend this product</div>
      <br></br>
      {/* 5 stars */}
      <Bar
        totalReviews={numberOfRatings}
        ratingCount={metaReviews?.ratings?.['5'] || 0}
        starRating={5}
        onClick={handleStarFilter}
      />
      {/* 4 stars */}
      <Bar
        totalReviews={numberOfRatings}
        ratingCount={metaReviews?.ratings?.['4'] || 0}
        starRating={4}
        onClick={handleStarFilter}
      />
      {/* 3 stars */}
      <Bar
        totalReviews={numberOfRatings}
        ratingCount={metaReviews?.ratings?.['3'] || 0}
        starRating={3}
        onClick={handleStarFilter}
      />
      {/* 2 stars */}
      <Bar
        totalReviews={numberOfRatings}
        ratingCount={metaReviews?.ratings?.['2'] || 0}
        starRating={2}
        onClick={handleStarFilter}
      />
      {/* 1 stars */}
      <Bar
        totalReviews={numberOfRatings}
        ratingCount={metaReviews?.ratings?.['1'] || 0}
        starRating={1}
        onClick={handleStarFilter}
      />
    </div>
  );
}

RatingsBreakdown.propTypes = {
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
  metaReviews: PropTypes.object,
};
