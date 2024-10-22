import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const FacebookIcon = ({ size = '' }) => {
  return <FontAwesomeIcon icon={faFacebook} size={size} />;
};

FacebookIcon.propTypes = {
  size: PropTypes.string,
};

export default FacebookIcon;
