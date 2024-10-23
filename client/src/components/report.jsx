import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Report({ onClick }) {

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      onClick();
      setClicked(true);
    }
  }
  return (
    <button onClick={handleClick} className="report-button d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1">
      { !clicked ? <div>report</div> : <div>reported</div> }
    </button>
  )
}

Report.PropTypes = {
  onClick: PropTypes.func.isRequired,
}