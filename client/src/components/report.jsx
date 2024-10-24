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
  };
  return (
    <button
      onClick={handleClick}
      className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap"
    >
      {!clicked ? 'Report' : 'Reported'}
    </button>
  );
}

Report.propTypes = {
  onClick: PropTypes.func.isRequired,
};
