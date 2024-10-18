import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icons.jsx';

export default function PrimaryButton({
  label = 'unnamed button',
  onClick = null,
  isDisabled = false,
  extraStyles = '',
  plus = false,
}) {
  const buttonStyle = `btn btn-primary square btn-lg ${isDisabled && 'disabled'} ${extraStyles}`;
  return (
    <button onClick={onClick} className={buttonStyle}>
      <span className="me-2">{label}</span>
      {plus && <Icon icon="fa-plus" />}
    </button>
  );
}

PrimaryButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  extraStyles: PropTypes.string,
  plus: PropTypes.bool,
};
