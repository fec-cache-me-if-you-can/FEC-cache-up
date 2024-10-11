import React from 'react';
import PropTypes from 'prop-types';

export default function Helpful({ helpfulness }) {
  return (
    <div className="helpful-button">
      <div>
        Helpful? <div>yes ({helpfulness})</div>
      </div>
    </div>
  );
}

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
};
