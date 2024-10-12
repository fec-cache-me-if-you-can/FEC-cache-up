import React from 'react';
import PropTypes from 'prop-types';

export default function Helpful({ helpfulness }) {
  return (
    <div className="helpful-button d-inline-flex p-2">
      <div className=" fw-lighter text-size-80">Helpful?</div>
      <div className="helpfulness fw-lighter text-size-80 text-decoration-underline ps-1">
        yes ({helpfulness})
      </div>
    </div>
  );
}

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
};
