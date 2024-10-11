import React from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';

export default function PrimaryButton({
  label = 'unnamed button',
  onClick = null,
  isDisabled = false,
  extraStyles = '',
  plus = false,
}) {
  const buttonStyle = `btn btn-primary square btn-lg m-3 ${extraStyles}`;
  const labelStyle = '';
  return (
    <button onClick={onClick} className={buttonStyle}>
      <span className={labelStyle}>{label}</span>
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
