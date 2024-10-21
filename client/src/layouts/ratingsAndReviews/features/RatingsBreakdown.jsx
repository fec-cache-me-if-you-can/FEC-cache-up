import React from 'react';
import StarRating from '../../../components/StarRating.jsx';
import Bar from '../../../components/Bar.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import PropTypes from 'prop-types';

export default function RatingsBreakdown({
  rating,
  numberOfRatings,
  metaReviews,
  selectedFilters,
  onFilterClick,
  onClearFilters,
}) {
  rating = Math.round(rating * 10) / 10;
  const recommended =
    numberOfRatings > 0
      ? (Math.round(
          (metaReviews?.recommended?.['true'] / numberOfRatings) * 100,
        ) *
          10) /
        10
      : 0;

  const isFilterActive = (starRating) => selectedFilters.includes(starRating);

  return (
    <div>
      <div className="rating-breakdown">
        <h1>{rating}</h1>
        <StarRating rating={rating} />
      </div>
      <div>{recommended}% of reviews recommend this product</div>
      <br></br>
      {/* Rating Bars */}
      {[5, 4, 3, 2, 1].map((star) => (
        <Bar
          key={star}
          totalReviews={numberOfRatings}
          ratingCount={metaReviews?.ratings?.[`${star}`] || 0}
          starRating={star}
          onClick={() => onFilterClick(star)}
          style={{
            backgroundColor: isFilterActive(star) ? 'lightgreen' : 'white',
          }}
        />
      ))}
      {selectedFilters.length > 0 && (
        <div>
          <p>
            <b>Filters Applied:</b> {selectedFilters.join(', ')} stars
          </p>
          <PrimaryButton
            label={'Remove all filters'}
            onClick={onClearFilters}
            isDisabled={false}
          />
        </div>
      )}
    </div>
  );
}

RatingsBreakdown.propTypes = {
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
  metaReviews: PropTypes.object,
  selectedFilters: PropTypes.array,
  onFilterClick: PropTypes.func,
  onClearFilters: PropTypes.func,
};
