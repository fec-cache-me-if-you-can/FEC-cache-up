import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

// usage:
// <XIcon size="2x" />

// valid sizes: 2xs, xs, sm, '', lg, xl and 2xl
const XIcon = ({ size = '' }) => {
  if (['2xs', 'xs', 'sm', '', 'lg', 'xl', '2xl'].indexOf(size) === -1) {
    throw new Error('Invalid size prop for XIcon');
  }
  return <FontAwesomeIcon icon={faXTwitter} size={size} />;
};

XIcon.propTypes = {
  size: PropTypes.string,
};

export default XIcon;
