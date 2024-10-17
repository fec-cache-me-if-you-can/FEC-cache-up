import React from 'react';

import KeywordSearch from './features/KeywordSearch.jsx';
import ProductBreakdown from './features/ProductBreakdown.jsx';
import RatingsBreakdown from './features/RatingsBreakdown.jsx';
import ReviewList from './features/ReviewsList.jsx';
import ReviewTile from './features/ReviewTile.jsx';
import SortOptions from './features/SortOptions.jsx';
import WriteNewReview from './features/WriteNewReview.jsx';
import PropTypes from 'prop-types';

export default function RatingsAndReviews({ metaReviews }) {
  // console.log('meta reviews from rating section: ', metaReviews);
  return (
    <div>
      <div id="ratings">Ratings And Reviews</div>
      <KeywordSearch />
      <ProductBreakdown />
      <RatingsBreakdown />
      <ReviewList />
      <ReviewTile />
      <SortOptions />
      <WriteNewReview />
    </div>
  );
}

RatingsAndReviews.propTypes = {
  metaReviews: PropTypes.object.isRequired,
};
