import React from 'react';
import PropTypes from 'prop-types';

export default function Helpful({ helpfulness, onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className="helpful-button d-flex align-items-center gap-2">
      <span className="text-secondary text-size-90">Helpful?</span>
      <button
        className="text-secondary bg-transparent border-0 text-decoration-underline text-size-90"
        onClick={onClick}
      >
        Yes ({helpfulness})
      </button>
    </div>
  );
}

Helpful.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
