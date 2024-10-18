import React, { useEffect, useState } from 'react';
import ReviewTile from './ReviewTile.jsx';
import PropTypes from 'prop-types';
import Button from '../../../components/PrimaryButton.jsx';
import DropdownSelector from '../../../components/DropdownSelector.jsx';

export default function ReviewList({ numberOfRatings, reviews }) {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [sortOrder, setSortOrder] = useState('relevant');
  const [sortedReviews, setSortedReviews] = useState([]);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    if (reviews.length) {
      relevantSort();
    }
  }, [reviews]);

  useEffect(() => {
    setVisibleReviews(sortedReviews.slice(0, index));
    setHasMoreReviews(sortedReviews.length > index);
  }, [sortedReviews]);

  const loadMoreReviews = () => {
    if (visibleReviews.length >= sortedReviews.length) return;
    const moreReviews = sortedReviews.slice(index, index + 2);
    setVisibleReviews(visibleReviews.concat(moreReviews));
    if (index + 2 >= sortedReviews.length) {
      setHasMoreReviews(false);
    }
    setIndex(index + 2);
  };

  const addReview = () => {
    return null;
    //TODO add review
  };

  const onSortChange = (selectedOption) => {
    setSortOrder(selectedOption);
    if (selectedOption === 'relevant') {
      relevantSort();
    } else if (selectedOption === 'helpful') {
      helpfulSort();
    } else {
      dateSort();
    }
  };

  const helpfulSort = () => {
    const arrayToSort = reviews.slice();
    arrayToSort.sort((a, b) => {
      const helpfulnessA = a.helpfulness || 0;
      const helpfulnessB = b.helpfulness || 0;
      return helpfulnessB - helpfulnessA;
    });
    setSortedReviews(arrayToSort);
  };

  const dateSort = () => {
    const arrayToSort = reviews.slice();
    arrayToSort.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    setSortedReviews(arrayToSort);
  };

  const relevantSort = () => {
    const arrayToSort = reviews.slice();
    arrayToSort.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const helpfulnessScoreA = a.helpfulness || 0;
      const helpfulnessScoreB = b.helpfulness || 0;
      const recencyWeight = 0.7;
      const scoreA =
        recencyWeight * dateA.getTime() +
        (1 - recencyWeight) * helpfulnessScoreA;
      const scoreB =
        recencyWeight * dateB.getTime() +
        (1 - recencyWeight) * helpfulnessScoreB;
      return scoreB - scoreA;
    });
    setSortedReviews(arrayToSort);
  };

  return (
    <div>
      {visibleReviews.length === 0 && (
        <div>
          <p>Be the first to review! </p>
          <Button label="Submit a review!" onClick={addReview} />
        </div>
      )}

      <div className="review-list-container">
        <div className="review-header">
          <span>
            {numberOfRatings} reviews, sorted by{' '}
            <DropdownSelector
              options={['relevant', 'helpful', 'newest']}
              placeholder={sortOrder}
              isDisabled={false}
              onChange={onSortChange}
              selectedOption={sortOrder}
            />
          </span>
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
          <Button label="More reviews" onClick={loadMoreReviews} />
        )}
      </div>
    </div>
  );
}

ReviewList.propTypes = {
  numberOfRatings: PropTypes.number,
  reviews: PropTypes.array,
};
