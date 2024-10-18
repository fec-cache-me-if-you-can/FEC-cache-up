import React from 'react';
import StarRating from '../../../components/StarRating.jsx';
import Icon from '../../../components/icons.jsx';
import PropTypes from 'prop-types';

export default function ReviewTile({
  rating,
  reviewerName,
  date,
  summary,
  body,
  recommend,
  response,
  helpfulness,
  photos,
}) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div>
      <span>
        <StarRating rating={rating} />
      </span>{' '}
      <span>{reviewerName}, </span>{' '}
      <span>{new Date(date).toLocaleDateString('en-US', dateOptions)}</span>
      <p>
        <b>{summary}</b>
      </p>
      <p>{body}</p>
      {photos &&
        photos.map((photo, index) => (
          <div
            key={index}
            style={{
              width: '60px',
              height: '60px',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
              margin: '10px',
            }}
          >
            <img
              src={photo.url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        ))}
      {recommend && (
        <p>
          <Icon icon="fa-regular fa-check" /> I recommend this product
        </p>
      )}
      {response && (
        <div>
          <p>
            <b>Response:</b>
          </p>
          <br></br>
          <p>{response}</p>
        </div>
      )}
      <span>Helpful? yes ({helpfulness}), no </span>
    </div>
  );
}

ReviewTile.propTypes = {
  key: PropTypes.number,
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
