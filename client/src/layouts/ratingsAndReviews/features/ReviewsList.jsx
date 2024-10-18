import React from 'react';
import ReviewTile from './ReviewTile.jsx';
import PropTypes from 'prop-types';

export default function ReviewList({ numberOfRatings, reviews }) {
  return (
    <dic>
      <div>{numberOfRatings} reviews, sorted by relevance</div>;
      <div>
        {reviews.map((review) => (
          <ReviewTile
            key={review.review_id}
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
    </dic>
  );
}

ReviewList.propTypes = {
  numberOfRatings: PropTypes.number,
  reviews: PropTypes.array,
};
