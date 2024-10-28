import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReviewTile from './ReviewTile.jsx';
import PropTypes from 'prop-types';
import Button from '@/components/PrimaryButton.jsx';
import DropdownSelectorSecondary from '@/components/DropdownSelectorSecondary.jsx';
import WriteNewReview from './WriteNewReview.jsx';

export default function ReviewList({ numberOfRatings, reviews, product }) {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [sortOrder, setSortOrder] = useState('relevant');
  const [sortedReviews, setSortedReviews] = useState([]);
  const [index, setIndex] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const relevantSort = useCallback(() => {
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
  }, [reviews]);

  const helpfulSort = useCallback(() => {
    const arrayToSort = reviews.slice();
    arrayToSort.sort((a, b) => {
      const helpfulnessA = a.helpfulness || 0;
      const helpfulnessB = b.helpfulness || 0;
      return helpfulnessB - helpfulnessA;
    });
    setSortedReviews(arrayToSort);
  }, [reviews]);

  const dateSort = useCallback(() => {
    const arrayToSort = reviews.slice();
    arrayToSort.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    setSortedReviews(arrayToSort);
  }, [reviews]);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (reviews.length) {
      relevantSort();
    }
  }, [reviews, relevantSort]);

  useEffect(() => {
    setVisibleReviews(sortedReviews.slice(0, index));
    setHasMoreReviews(sortedReviews.length > index);
  }, [sortedReviews, index]);

  const loadMoreReviews = useCallback(() => {
    if (visibleReviews.length >= sortedReviews.length) return;
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 2;
      return newIndex;
    });
  }, [sortedReviews.length, visibleReviews.length]);

  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  const onSortChange = useCallback(
    (selectedOption) => {
      setSortOrder(selectedOption);
      if (selectedOption === 'relevant') {
        relevantSort();
      } else if (selectedOption === 'helpful') {
        helpfulSort();
      } else {
        dateSort();
      }
    },
    [relevantSort, helpfulSort, dateSort],
  );

  const sortOptions = useMemo(() => ['relevant', 'helpful', 'newest'], []);

  return (
    <div className="">
      {visibleReviews.length === 0 && (
        <div className="text-center py-4">
          <p className="mb-3">Be the first to review!</p>
          <Button label="Submit a review!" onClick={openModal} />
        </div>
      )}

      {visibleReviews.length > 0 && (
        <div className="d-flex flex-column gap-4">
          <div className="d-flex align-items-start align-items-md-center gap-2">
            <span className="fs-6 fs-md-5 fw-medium">
              {numberOfRatings} reviews, sorted by
            </span>
            <div style={{ width: '150px' }}>
              {' '}
              <DropdownSelectorSecondary
                options={sortOptions}
                placeholder={sortOrder}
                isDisabled={false}
                onChange={onSortChange}
                selectedOption={sortOrder}
              />
            </div>
          </div>

          <div
            className="overflow-y-scroll scrollable-reviews"
            style={{
              maxHeight: '60vh',
              scrollbarWidth: 'thin',
            }}
          >
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

          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
            {hasMoreReviews && (
              <Button
                label="More reviews"
                onClick={loadMoreReviews}
                className="w-100 w-md-auto"
              />
            )}
            <Button
              label="Add a review +"
              onClick={openModal}
              className="w-100 w-md-auto"
            />
          </div>

          <div
            className={`review-modal-overlay position-fixed top-0 start-0 w-100 h-100 ${
              isModalVisible ? 'visible' : ''
            }`}
            onClick={closeModal}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1050,
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                closeModal();
              }
            }}
          >
            <div
              className="review-modal-content position-relative bg-white p-4 rounded-3 mx-auto my-4"
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                marginTop: '2rem',
              }}
              onClick={(event) => event.stopPropagation()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation();
                }
              }}
            >
              <WriteNewReview
                productName={product.name}
                product_id={product.id}
                onClose={closeModal}
                show={isModalVisible}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ReviewList.propTypes = {
  numberOfRatings: PropTypes.number,
  reviews: PropTypes.array,
  product: PropTypes.object,
};
