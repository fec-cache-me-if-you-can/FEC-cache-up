import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AnswerPhoto({ url }) {

  const [imageToggled, setImageToggled] = useState('false');

  const imgStylesm = {
    'width': '70px',
    'height': '70px',
  }

  const imgStylelg = {
    'width': '700px',
    'height': '700px',
  }

  const toggleImage = () => {
    setImageToggled((current) => !current);
  };

  return (
    <>
    <img className="me-3 object-fit-cover" onClick={toggleImage} style={imgStylesm} src={url} alt={'photo'}></img>
    {imageToggled && (
      <img className="me-3 object-fit-cover review-modal-overlay" style={imgStylelg} onClick={toggleImage} src={url} alt={'photo'}></img>
    )}
    </>
  );
}

AnswerPhoto.propTypes = {
  url: PropTypes.string.isRequired,
};
