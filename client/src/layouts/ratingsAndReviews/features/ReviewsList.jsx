import React, { useEffect, useState } from 'react';
import ReviewTile from './ReviewTile.jsx';
import PropTypes from 'prop-types';

export default function ReviewList({ numberOfRatings, reviews }) {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);

  useEffect(() => {
    setVisibleReviews(reviews.slice(0, 2));
    setHasMoreReviews(reviews.length > 2);
  }, [reviews]);

  const loadMoreReviews = () => {
    const index = visibleReviews.length;
    const moreReviews = reviews.slice(index, index + 2);
    setVisibleReviews(visibleReviews.concat(moreReviews));
    if (index + 2 >= reviews.length) {
      setHasMoreReviews(false);
    }
  };

  return (
    <div>
      {visibleReviews.length === 0 && (
        <div>
          <p>Be the first to review! </p>
          <button>Submit a review!</button>
        </div>
      )}

      <div className="review-list-container">
        <div className="review-header">
          <span>{numberOfRatings} reviews, sorted by relevance</span>
        </div>

        <div className="scrollable-reviews">
          {visibleReviews.map((review) => (
            <ReviewTile
              key={review.review_id}
              reviewId={review.review_id}
              rating={review.rating}
              reviewerName={review.reviewer_name}
              date={review.date}
              summary={review.summary}
              body={review.body}
              recommend={review.recommend}
              response={review.response}
              helpfulness={review.helpfulness}
              photos={review.photos}
            />
          ))}
        </div>

        {hasMoreReviews && (
          <button onClick={loadMoreReviews}>More reviews</button>
        )}
      </div>
    </div>
  );
}

ReviewList.propTypes = {
  numberOfRatings: PropTypes.number,
  reviews: PropTypes.array,
};
