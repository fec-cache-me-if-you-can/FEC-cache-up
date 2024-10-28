import React from 'react';
import Icon from '@/components/icons.jsx';
import PropTypes from 'prop-types';

export default function FavoriteToggle({ productId, action }) {
  const handleClick = (e) => {
    e.preventDefault();
    const { target } = e;
    target.classList.add('is-favorite');

    const removeFavoriteClass = () => {
      target.classList.remove('is-favorite');
    };

    setTimeout(removeFavoriteClass, 1000);

    try {
      if (typeof action === 'function') {
        action(productId);
      } else {
        console.error('Action prop is not a function');
      }
    } catch (error) {
      console.error('Error executing action:', error);
    }
  };

  return (
    <button
      className="transparent-button"
      onClick={handleClick}
      aria-label="Toggle favorite"
    >
      <Icon icon="fa-star fa-regular fa-xl" />
    </button>
  );
}

FavoriteToggle.propTypes = {
  productId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
