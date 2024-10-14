import React from 'react';

import KeywordSearch from './features/KeywordSearch.jsx';
import ProductBreakdown from './features/ProductBreakdown.jsx';
import RatingsBreakdown from './features/RatingsBreakdown.jsx';
import ReviewList from './features/ReviewsList.jsx';
import ReviewTile from './features/ReviewTile.jsx';
import SortOptions from './features/SortOptions.jsx';
import WriteNewReview from './features/WriteNewReview.jsx';

export default function RatingsAndReviews() {
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
