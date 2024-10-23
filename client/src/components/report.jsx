import React from 'react';
import PropTypes from 'prop-types';

export default function Report({ onClick }) {

  const handleClick = () => {
    onClick()
  }
  return (
    <button onClick={handleClick} className="report-button d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1">
      Report
    </button>
  )
}

Report.PropTypes = {
  onClick: PropTypes.func.isRequired,
}