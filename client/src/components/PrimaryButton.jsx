import React from "react";
import PropTypes from "prop-types";

export default function PrimaryButton({ label, onClick }) {
  const buttonClassNames = "btn";
  return (
    <button onClick={onClick} className={buttonClassNames}>
      <span>{label}</span>
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
