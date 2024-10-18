// RelatedProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import FavoriteToggle from './favoriteToggle.jsx';

const RelatedProductCard = ({ productId, action }) => {
  const renderFavoriteIcon = (id) => (
    <FavoriteToggle productId={id} action={action} />
  );

  return (
    <AbstractProductCard
      productId={productId}
      renderIcon={renderFavoriteIcon}
    />
  );
};

RelatedProductCard.propTypes = {
  productId: PropTypes.string,
  action: PropTypes.func,
};

export default RelatedProductCard;
