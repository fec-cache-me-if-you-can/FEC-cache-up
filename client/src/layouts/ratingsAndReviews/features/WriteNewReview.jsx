import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../../../components/StarRating.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import CharacteristicsForm from './CharacteristicsForm.jsx';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

export default function WriteNewReview({
  productName,
  product_id,
  onClose,
  show,
}) {
  const [rating, setRating] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [characteristics, setCharacteristics] = useState({});
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const characteristicOptions = {
    Size: [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too big',
    ],
    Width: [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide',
    ],
    Comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect',
    ],
    Quality: [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect',
    ],
    Length: [
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs Long',
    ],
    Fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long',
    ],
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };
  const handleRecommendClick = (event) => {
    setRecommend(event.target.value === 'yes');
  };

  const characteristicIds = {
    Size: '135223',
    Width: '135224',
    Comfort: '135221',
    Quality: '135222',
    Length: '135220',
    Fit: '135219',
  };

  const handleCharacteristicChange = (charId, value) => {
    if (charId) {
      setCharacteristics((prev) => ({
        ...prev,
        [charId]: value,
      }));
    }
  };

  const handleSummary = (event) => {
    setSummary(event.target.value);
  };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleReviewerName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5));
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = [];
    if (rating === null) newErrors.push('Overall rating');
    if (recommend === null) newErrors.push('Recommendation');
    if (!body || body.length < 50)
      newErrors.push('Review body (at least 50 characters)');
    if (!name) newErrors.push('Nickname');
    if (!email || !emailRegex.test(email)) newErrors.push('Valid email');
    if (photos.length > 5) newErrors.push('No more than 5 photos');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitting review...');
      axios
        .post('/reviews', {
          product_id: product_id,
          rating: rating,
          summary: summary,
          body: body,
          recommend: recommend,
          name: name,
          email: email,
          photos: photos,
          characteristics: characteristics,
        })
        .then(() => {
          console.log('review submitted sucessfully!');
          setIsSubmitted(true); // Show thank-you message
          setTimeout(onClose, 2000);
        })
        .catch((error) => {
          console.log('error submitting review: ', error);
        });
    } else {
      console.log('Form is not validated');
    }
  };

  if (isSubmitted) {
    return <p>Thank you! Your review has been submitted.</p>;
  }

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="xl"
      backdrop="static"
      keyboard={false}
      contentClassName="square px-4 px-md-5 py-4"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fs-4 fw-medium">
          Write Your Review About the {productName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-2">
        <div className="mb-4">
          <p className="fw-medium mb-2">Overall Rating *</p>
          <div className="d-flex align-items-center gap-3">
            <StarRating rating={rating} onClick={handleRatingClick} />
            <p className="mb-0 text-secondary">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Average'}
              {rating === 4 && 'Good'}
              {rating === 5 && 'Great'}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <fieldset>
            <p className="fw-medium mb-2">Do you recommend this product? *</p>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="yes"
                  name="recommend"
                  value="yes"
                  onClick={handleRecommendClick}
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="no"
                  name="recommend"
                  value="no"
                  onClick={handleRecommendClick}
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="mb-4">
          {Object.entries(characteristicOptions).map(([charName, labels]) => (
            <CharacteristicsForm
              key={charName}
              name={charName}
              charId={characteristicIds[charName]}
              value={characteristics[characteristicIds[charName]] || null}
              onChange={handleCharacteristicChange}
              labels={labels}
            />
          ))}
        </div>

        <div className="mb-4">
          <p className="fw-medium mb-2">Review Summary</p>
          <textarea
            className="form-control"
            name="summary"
            rows="1"
            maxLength="60"
            placeholder="Example: Best purchase ever!"
            value={summary}
            onChange={handleSummary}
          />
        </div>

        <div className="mb-4">
          <p className="fw-medium mb-2">Give us your detailed feedback *</p>
          <textarea
            className="form-control mb-2"
            name="body"
            rows="5"
            maxLength="1000"
            placeholder="Why did you like the product or not?"
            value={body}
            onChange={handleBody}
          />
          <small className="text-secondary">
            {body.length < 50
              ? `Minimum required characters left: ${50 - body.length}`
              : 'Minimum reached'}
          </small>
        </div>

        <div className="mb-4">
          <p className="fw-medium mb-2">Upload your photos</p>
          {photos.length < 5 && (
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          )}
          <div className="d-flex gap-2 flex-wrap">
            {photos.map((photo, index) => (
              <div key={index} className="position-relative">
                <img
                  src={photo.url}
                  alt={`Upload ${index + 1}`}
                  className="rounded"
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                  }}
                />
                <button
                  className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 translate-middle p-0"
                  style={{ width: '20px', height: '20px', fontSize: '10px' }}
                  onClick={() => handleRemovePhoto(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="fw-medium mb-2">What is your nickname? *</p>
          <input
            type="text"
            className="form-control mb-1"
            name="name"
            maxLength="60"
            placeholder="Example: jackson11!"
            value={name}
            onChange={handleReviewerName}
          />
          <small className="text-secondary">
            For privacy reasons, do not use your full name or email address
          </small>
        </div>

        <div className="mb-4">
          <p className="fw-medium mb-2">What is your email? *</p>
          <input
            type="email"
            className="form-control mb-1"
            name="email"
            maxLength="60"
            placeholder="Example: jackson11@email.com"
            value={email}
            onChange={handleEmail}
          />
          <small className="text-secondary">
            For authentication reasons, you will not be emailed
          </small>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-center">
        {errors.length > 0 && (
          <div className="text-danger small mt-2 d-flex align-content-center justify-content-center gap-3 p4">
            <p className="fw-bold mb-1">
              Review not submitted. Fix these inputs:
            </p>
            {errors.map((error, index) => (
              <p key={index} className="mb-0">
                {error}
              </p>
            ))}
          </div>
        )}
        <PrimaryButton label="Submit Review" onClick={submitReview} />
      </Modal.Footer>
    </Modal>
  );
}

WriteNewReview.propTypes = {
  productName: PropTypes.string,
  product_id: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};
