import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from './icons';

export default function PrimaryButton({
  label = 'unnamed button',
  onClick = null,
  isDisabled = false,
  extraStyles = '',
  plus = false,
}) {
  const buttonStyle = `btn btn-primary square btn-lg m-3 ${isDisabled && 'disabled'} ${extraStyles}`;
  return (
    <button onClick={onClick} className={buttonStyle}>
      <span className="me-2">{label}</span>
      {plus && <FontAwesomeIcon icon="fa-solid fa-sharp fa-plus" />}
    </button>
  );
}

// Prop type validation
PrimaryButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  extraStyles: PropTypes.string,
  plus: PropTypes.bool,
};
