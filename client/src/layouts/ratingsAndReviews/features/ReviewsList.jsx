import React, { useEffect, useState } from 'react';
import ReviewTile from './ReviewTile.jsx';
import PropTypes from 'prop-types';
import Button from '../../../components/PrimaryButton.jsx';
import DropdownSelector from '../../../components/DropdownSelector.jsx';
import WriteNewReview from './WriteNewReview.jsx';

export default function ReviewList({ numberOfRatings, reviews, product }) {
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [sortOrder, setSortOrder] = useState('relevant');
  const [sortedReviews, setSortedReviews] = useState([]);
  const [index, setIndex] = useState(2);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

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

  const CustomDropdownSelector = ({ options, selectedOption, onChange }) => (
    <div className="custom-dropdown" onClick={(e) => e.stopPropagation()}>
      <span className="selected-option">
        {selectedOption} <span className="arrow">▼</span>
      </span>
      <select
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
        style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );


  return (
    <div>
      {visibleReviews.length === 0 && (
        <div>
          <p>Be the first to review! </p>
          <Button label="Submit a review!" onClick={openModal} />
        </div>
      )}
{visibleReviews.length > 0 && (
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
              className="custom-dropdown"
              customStyles={{
                display: 'inline',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
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
        <Button label="add a review +" onClick={openModal} />

        {/* Modal Section */}
        <div
          className={`review-modal-overlay ${isModalVisible ? 'visible' : ''}`}
          onClick={closeModal}
        >
          <div
            className="review-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <WriteNewReview
              productName={product.name}
              product_id={product.id}
              onClose={closeModal}
            />
          </div>
        </div>
      </div>
      ) }
    </div>
  );
}

ReviewList.propTypes = {
  numberOfRatings: PropTypes.number,
  reviews: PropTypes.array,
  product: PropTypes.object,
};
