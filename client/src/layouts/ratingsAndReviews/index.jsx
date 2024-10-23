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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`reviews/?product_id=${product.id}`).then((response) => {
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

  const handleSearchFilter = (query) => {
    setSearchTerm(query);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      searchTerm.length < 3 ||
      review.body.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(review.rating);

    return matchesSearch && matchesFilter;
  });

  const clearFilters = () => setSelectedFilters([]);

  return (
    <div className="ratings-reviews-container">
      <div id="ratings-header">
        <h6>Ratings And Reviews</h6>{' '}
      </div>

      <div className="ratings-reviews-content">
        {/* Left Column: Ratings + Product Breakdown */}

        <div className="ratings-breakdown-column">
          <KeywordSearch handleSearchFilter={handleSearchFilter} />
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
          product={product}
        />
      </div>
    </div>
  );
}

RatingsAndReviews.propTypes = {
  metaReviews: PropTypes.object.isRequired,
  product: PropTypes.object,
  rating: PropTypes.number,
  numberOfRatings: PropTypes.number,
};
