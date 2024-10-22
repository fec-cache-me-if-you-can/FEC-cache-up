import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';

// usage:
// <PinterestIcon size="2x" />

// valid sizes: 2xs, xs, sm, '', lg, xl and 2xl
const PinterestIcon = ({ size = '' }) => {
  if (['2xs', 'xs', 'sm', '', 'lg', 'xl', '2xl'].indexOf(size) === -1) {
    throw new Error('Invalid size prop for PinterestIcon');
  }
  return <FontAwesomeIcon icon={faPinterest} size={size} />;
};

PinterestIcon.propTypes = {
  size: PropTypes.string,
};

export default PinterestIcon;
