import React from 'react';
import PropTypes from 'prop-types';

export default function Helpful({ helpfulness, onClick = () => {} }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="helpful-button d-inline-flex align-items-start">
      <div className="text-secondary text-size-90">Helpful?</div>
      <button
        className="helpfulness text-secondary text-size-90 bg-transparent border-0 shadow-none text-decoration-underline d-flex align-content-center pt-0"
        onClick={handleClick}
      >
        yes ({helpfulness})
      </button>
    </div>
  );
}

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
