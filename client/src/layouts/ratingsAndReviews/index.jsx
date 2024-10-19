import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KeywordSearch from './features/KeywordSearch.jsx';
import ProductBreakdown from './features/ProductBreakdown.jsx';
import RatingsBreakdown from './features/RatingsBreakdown.jsx';
import ReviewList from './features/ReviewsList.jsx';
import ReviewTile from './features/ReviewTile.jsx';
import WriteNewReview from './features/WriteNewReview.jsx';
import PropTypes from 'prop-types';

export default function RatingsAndReviews({
  metaReviews,
  product,
  rating,
  numberOfRatings,
}) {
  const [reviews, setReviews] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    axios.get(`reviews/?product_id=${product.id}`).then((response) => {
      console.log('response with reviews: ', response);
      setReviews(response.data.results);
    });
  }, [product.id]);

  const handleFilterClick = (starRating) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(starRating)
        ? prevFilters.filter((filter) => filter !== starRating)
        : [...prevFilters, starRating],
    );
  };

  const filteredReviews = reviews.filter(
    (review) =>
      selectedFilters.length === 0 || selectedFilters.includes(review.rating),
  );

  const clearFilters = () => setSelectedFilters([]);

  return (
    <div className="ratings-reviews-container">
      <div id="ratings-header">Ratings And Reviews</div>
      <KeywordSearch />

      <div className="ratings-reviews-content">
        {/* Left Column: Ratings + Product Breakdown */}
        <div className="ratings-breakdown-column">
          <RatingsBreakdown
            rating={rating}
            numberOfRatings={numberOfRatings}
            metaReviews={metaReviews}
            selectedFilters={selectedFilters}
            onFilterClick={handleFilterClick}
            onClearFilters={clearFilters}
          />
          <div className="product-breakdown-container">
            <ProductBreakdown metaReviews={metaReviews} />
          </div>
        </div>

        {/* Right Column: Review List */}
        <ReviewList
          numberOfRatings={numberOfRatings}
          reviews={filteredReviews}
        />
      </div>

      <WriteNewReview />
    </div>
  );
}

RatingsAndReviews.propTypes = {
  metaReviews: PropTypes.object.isRequired,
  product: PropTypes.object,
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
