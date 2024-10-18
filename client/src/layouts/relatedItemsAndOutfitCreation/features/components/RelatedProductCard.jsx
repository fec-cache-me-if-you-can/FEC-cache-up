// RelatedProductCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import CompareButton from './CompareButton.jsx';

const RelatedProductCard = ({ productId, action }) => {
  const renderFavoriteIcon = (id) => (
    <CompareButton productId={id} action={action} />
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
