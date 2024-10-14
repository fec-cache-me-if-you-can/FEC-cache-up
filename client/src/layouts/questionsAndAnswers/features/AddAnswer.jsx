import React from 'react';
import PropTypes from 'prop-types';

export default function AddAnswer({ onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="helpfulness d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
      onClick={handleClick}
    >
      AddAnswer
    </button>
  );
}

AddAnswer.propTypes = {
  helpfulness: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
