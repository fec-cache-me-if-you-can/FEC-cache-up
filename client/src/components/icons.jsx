import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { all } from '@awesome.me/kit-60350fbc81/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

library.add(...all);
export default function Icon({ icon, size, style }) {
  return icon ? (
    <FontAwesomeIcon icon={'fa-sharp ' + icon} size={size} style={style} />
  ) : (
    <div className="text-danger">missing prop value for icon</div>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};
