import React, { useState } from 'react';
import Icon from '../../../components/icons.jsx';
import PropTypes from 'prop-types';

export default function FavoriteToggle({ productId, onToggle }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e) => {
    e.target.classList.add('is-favorite');
    setTimeout(() => {
      e.target.classList.remove('is-favorite');
    }, 1000);
    setIsFavorite(!isFavorite);
    onToggle(productId);
  };

  return (
    <>
      <div classList="favorite-icon" onClick={handleFavoriteToggle}>
        {isFavorite ? (
          <Icon icon={'fa-heart fa-solid fa-xl'} />
        ) : (
          <Icon icon={'fa-heart fa-regular fa-xl'} />
        )}
      </div>
    </>
  );
}

FavoriteToggle.propTypes = {
  productId: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
};