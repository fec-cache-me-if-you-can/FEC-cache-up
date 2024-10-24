import React, { useState } from 'react';
import axios from 'axios';
import StarRating from '../../../components/StarRating.jsx';
import Icon from '../../../components/icons.jsx';
import CheckmarkNote from '../../../components/CheckmarkNote.jsx';
import PropTypes from 'prop-types';

export default function ReviewTile({
  reviewId,
  rating,
  reviewerName,
  date,
  summary,
  body = '',
  recommend,
  response,
  helpfulness,
  photos,
}) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(helpfulness);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleExpanded = () => setBodyExpanded(!bodyExpanded);
  const displayedBody = bodyExpanded ? body : body.slice(0, 10);

  const markAsHelpful = () => {
    if (hasVotedHelpful) return;
    axios
      .put(`/reviews/helpful`, { review_id: reviewId })
      .then(() => {
        setHelpfulCount(helpfulCount + 1);
        setHasVotedHelpful(true);
      })
      .catch((error) => {
        console.error('Error marking review as helpful:', error);
      });
  };

  const reportReview = () => {
    axios
      .put(`/reviews/report`, { review_id: reviewId })
      .then(() => {
        console.log('item has been reported');
      })
      .catch((error) => {
        console.error('Error marking review as helpful:', error);
      });
  };

  const openModal = (photoUrl) => setSelectedPhoto(photoUrl);
  const closeModal = () => setSelectedPhoto(null);

  return (
    <div className="my-3 pe-4">
      <div className="review-top">
        <div className="review-star-rating">
          <StarRating rating={rating} />
        </div>
        <div className="review-user-info">
          {reviewerName},{' '}
          {new Date(date).toLocaleDateString('en-US', dateOptions)}
        </div>
      </div>

      <div className="review-summary">{summary}</div>

      <div className="review-body">
        {displayedBody}
        {body.length > 10 && (
          <span
            onClick={toggleExpanded}
            className="helpfulness text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
            style={{ cursor: 'pointer', marginLeft: '5px' }}
          >
            {bodyExpanded ? 'Show less' : 'Show more'}
          </span>
        )}
      </div>

      <div className="review-photos">
        {photos &&
          photos.map((photo) => (
            <div
              key={photo.id}
              className="thumbnail"
              onClick={() => openModal(photo.url)}
              style={{
                width: '60px',
                height: '60px',
                overflow: 'hidden',
                display: 'inline-block',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              <img
                src={photo.url}
                alt="Review thumbnail"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          ))}
      </div>

      {recommend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Icon icon="fa-check" />
          <span>I recommend this product</span>
        </div>
      )}

      {response && (
        <div className="review-response">
          <p>
            <b>Response:</b> {response}
          </p>
        </div>
      )}

      <div
        className="review-helpful"
        style={{ display: 'inline-flex', gap: '5px', alignItems: 'center' }}
      >
        Helpful?
        <button
          className="helpfulness text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
          onClick={markAsHelpful}
        >
          Yes{'  '}({helpfulCount})
        </button>{' '}
        |{' '}
        <button
          className="helpfulness text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
          onClick={reportReview}
        >
          {'  '}
          Report{'  '}
        </button>{' '}
      </div>

      {selectedPhoto && (
        <div
          className="modal"
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'pointer',
          }}
        >
          <img
            src={selectedPhoto}
            alt="Full resolution"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />
        </div>
      )}

      <div className="review-separator" />
    </div>
  );
}

ReviewTile.propTypes = {
  reviewId: PropTypes.number,
  rating: PropTypes.number,
  reviewerName: PropTypes.string,
  date: PropTypes.string,
  summary: PropTypes.string,
  body: PropTypes.string,
  recommend: PropTypes.bool,
  response: PropTypes.string,
  helpfulness: PropTypes.number,
  photos: PropTypes.array,
};
