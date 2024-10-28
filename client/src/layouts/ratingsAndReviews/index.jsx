import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KeywordSearch from './features/KeywordSearch.jsx';
import ProductBreakdown from './features/ProductBreakdown.jsx';
import RatingsBreakdown from './features/RatingsBreakdown.jsx';
import ReviewList from './features/ReviewsList.jsx';
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
    <div className="container-fluid px-4 px-md-0">
      <h5 className="section-header mb-4">Ratings And Reviews</h5>

      <div className="row g-4">
        <div className="col-12 col-lg-4 col-xl-3 pe-lg-5">
          <div className="mb-4">
            <RatingsBreakdown
              rating={rating}
              numberOfRatings={numberOfRatings}
              metaReviews={metaReviews}
              selectedFilters={selectedFilters}
              onFilterClick={handleFilterClick}
              onClearFilters={clearFilters}
            />
          </div>
          <div>
            <ProductBreakdown metaReviews={metaReviews} />
          </div>
        </div>

        <div className="col-12 col-lg-8 col-xl-9">
          <div className="d-flex flex-column gap-3">
            <KeywordSearch handleSearchFilter={handleSearchFilter} />
            <ReviewList
              numberOfRatings={numberOfRatings}
              reviews={filteredReviews}
              product={product}
            />
          </div>
        </div>
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
