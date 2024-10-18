import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KeywordSearch from './features/KeywordSearch.jsx';
import ProductBreakdown from './features/ProductBreakdown.jsx';
import RatingsBreakdown from './features/RatingsBreakdown.jsx';
import ReviewList from './features/ReviewsList.jsx';
import ReviewTile from './features/ReviewTile.jsx';
import SortOptions from './features/SortOptions.jsx';
import WriteNewReview from './features/WriteNewReview.jsx';
import PropTypes from 'prop-types';

export default function RatingsAndReviews({
  metaReviews,
  product,
  rating,
  numberOfRatings,
}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`reviews/?product_id=${product.id}`).then((response) => {
      console.log('response with reviews: ', response);
      setReviews(response.data.results);
    });
  }, [product.id]);

  return (
    <div>
      <div id="ratings">Ratings And Reviews</div>
      <KeywordSearch />
      <ProductBreakdown />
      <RatingsBreakdown rating={rating} numberOfRatings={numberOfRatings} />
      <ReviewList numberOfRatings={numberOfRatings} reviews={reviews} />
      <SortOptions />
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
