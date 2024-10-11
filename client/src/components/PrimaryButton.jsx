import React from 'react';
import PropTypes from 'prop-types';

export default function PrimaryButton({ label, onClick, isDisabled = false }) {
  const buttonStyle = 'btn btn-primary';
  const labelStyle = '';
  return (
    <button onClick={onClick} className={buttonStyle} disabled={isDisabled}>
      <span className={labelStyle}>{label}</span>
    </button>
  );
}

// Prop type validation
PrimaryButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// Default props
PrimaryButton.defaultProps = {
  onClick: null,
};
