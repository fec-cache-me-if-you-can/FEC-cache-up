import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icons.jsx';

export default function PrimaryButton({
  label = 'unnamed button',
  onClick = null,
  isDisabled = false,
  extraStyles = '',
  plus = false,
  fullWidth = true,
}) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary square btn-lg ${fullWidth ? 'w-100' : ''} ${
        isDisabled ? 'disabled' : ''
      } ${extraStyles}`}
    >
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
  fullWidth: PropTypes.bool,
};
