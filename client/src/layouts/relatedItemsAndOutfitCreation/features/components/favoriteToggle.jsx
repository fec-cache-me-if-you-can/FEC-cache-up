import React, { useState } from 'react';
import Icon from '../../../../components/icons.jsx';
import PropTypes from 'prop-types';

export default function FavoriteToggle({ productId, action }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.classList.add('is-favorite');
    setTimeout(() => {
      e.target.classList.remove('is-favorite');
    }, 1000);
    action(productId);
  };

  return (
    <button className="transparent-button" onClick={handleClick}>
      <Icon icon={'fa-star fa-regular fa-xl'} />
    </button>
  );
}

FavoriteToggle.propTypes = {
  productId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
