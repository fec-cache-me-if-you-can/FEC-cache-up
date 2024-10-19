// RelatedProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import FavoriteToggle from './favoriteToggle.jsx';

const RelatedProductCard = ({ productId, action, setProductId }) => {
  const renderFavoriteIcon = (id) => (
    <FavoriteToggle productId={id} action={action} />
  );

  return (
    <AbstractProductCard
      productId={productId}
      renderIcon={renderFavoriteIcon}
      setProductId={setProductId}
    />
  );
};

RelatedProductCard.propTypes = {
  productId: PropTypes.string,
  action: PropTypes.func,
  setProductId: PropTypes.func,
};

export default RelatedProductCard;
