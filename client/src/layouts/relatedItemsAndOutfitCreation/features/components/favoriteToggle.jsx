import React, { useState } from 'react';
import Icon from '../../../../components/icons.jsx';
import PropTypes from 'prop-types';

export default function FavoriteToggle({ productId, onToggle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.target.classList.add('is-favorite');
    setTimeout(() => {
      e.target.classList.remove('is-favorite');
    }, 1000);
    setIsFavorite(!isFavorite);
    onToggle(productId);
  };

  return (
    <button className="transparent-button" onClick={handleFavoriteToggle}>
      {isFavorite ? (
        <Icon icon={'fa-heart fa-solid fa-xl'} />
      ) : (
        <Icon icon={'fa-heart fa-regular fa-xl'} />
      )}
    </button>
  );
}

FavoriteToggle.propTypes = {
  productId: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};
