import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../../../components/StarRating.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import CharacteristicsForm from './CharacteristicsForm.jsx';
import PropTypes from 'prop-types';

export default function WriteNewReview({ productName, product_id }) {
  const [rating, setRating] = useState(null);
  const [recommend, setRecommend] = useState(null);
  const [characteristics, setCharacteristics] = useState({});
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState([]);

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

  const submitReview = () => {
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
        })
        .catch((error) => {
          console.log('error submitting review: ', error);
        });
    } else {
      console.log('Form is not validated');
    }
  };

  return (
    <div>
      <h1> Write your review </h1>
      <h6> About the {productName}</h6>
      {/* Star rating */}
      <div>
        <p>
          <b>Overall rating *</b>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <StarRating rating={rating} onClick={handleRatingClick} />
          <p>
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Average'}
            {rating === 4 && 'Good'}
            {rating === 5 && 'Great'}
          </p>
        </div>
      </div>
      {/* Recommend  */}
      <div>
        <fieldset>
          <p>
            <b>Do you recommend this product? *</b>
          </p>
          <div>
            <input
              type="radio"
              id="yes"
              name="recommend"
              value="yes"
              onClick={handleRecommendClick}
            />
            <label htmlFor="yes"> Yes</label>
          </div>

          <div>
            <input
              type="radio"
              id="no"
              name="recommend"
              value="no"
              onClick={handleRecommendClick}
            />
            <label htmlFor="no"> No</label>
          </div>
        </fieldset>
      </div>
      {/*Characteristic  */}
      <div>
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
      {/* review Summary  */}
      <div>
        <p>
          <b>Review Summary:</b>
        </p>
        <textarea
          type="text"
          name="summary"
          cols="60"
          rows="1"
          maxLength="60"
          placeholder="Example: Best purchase ever!"
          value={summary}
          onChange={handleSummary}
        ></textarea>
      </div>
      {/* review body  */}
      <div>
        <p>
          <b>Gives us your detailed feedback: *</b>
        </p>
        <textarea
          name="body"
          cols="60"
          rows="5"
          maxLength="1000"
          placeholder="Why did you like the product or not?"
          value={body}
          onChange={handleBody}
        ></textarea>
        {body.length < 50 ? (
          <p>Minimum required characters left: {50 - body.length}</p>
        ) : (
          <p> Minimum reached</p>
        )}
      </div>

      {/* Upload photos */}
      <div>
        <p>
          <b>Upload your photos</b>
        </p>

        {/* Show the "Add Photos" button only if less than 5 photos */}
        {photos.length < 5 && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
          />
        )}

        {/* Display thumbnails */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {photos.map((photo, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={photo.url}
                alt={`Uploaded preview ${index + 1}`}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
              <button
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => handleRemovePhoto(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Nickname  */}
      <div>
        <p>
          <b>What is your nickname? *</b>
        </p>
        <textarea
          name="name"
          cols="60"
          rows="1"
          maxLength="60"
          placeholder="Example: jackson11!"
          value={name}
          onChange={handleReviewerName}
        ></textarea>
        <p>For privacy reasons, do not use your full name or email address</p>
      </div>

      {/* Email  */}
      <div>
        <p>
          <b>What is your email? *</b>
        </p>
        <textarea
          name="email"
          cols="60"
          rows="1"
          maxLength="60"
          placeholder="Example: jackson11@email.com"
          value={email}
          onChange={handleEmail}
        ></textarea>
        <p>For authentication reasons, you will not be emailed</p>
      </div>

      {/* Submit  */}
      <div>
        <PrimaryButton label={'Submit review'} onClick={submitReview} />
        {errors.length > 0 && (
          <div
            style={{
              color: 'red',
              fontSize: '12px',
              lineHeight: '1.2',
              marginTop: '5px',
            }}
          >
            <p>
              <b>Review not submitted. Fix these inputs:</b>
            </p>
            {errors.map((error, index) => (
              <p key={index} style={{ margin: '2px 0' }}>
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

WriteNewReview.propTypes = {
  productName: PropTypes.string,
  product_id: PropTypes.number,
};
