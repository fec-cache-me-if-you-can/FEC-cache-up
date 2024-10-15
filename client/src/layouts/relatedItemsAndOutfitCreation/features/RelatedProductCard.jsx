// RelatedProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import FavoriteToggle from './favoriteToggle.jsx';

const RelatedProductCard = ({ productId }) => {
  const renderFavoriteIcon = (id) => (
    <FavoriteToggle
      productId={id}
      onToggle={() => console.log('FavoriteToggle')}
    />
  );

  return (
    <AbstractProductCard
      productId={productId}
      renderIcon={renderFavoriteIcon}
    />
  );
};

RelatedProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
};

RelatedProductCard.displayName = 'RelatedProductCard';

export default RelatedProductCard;
