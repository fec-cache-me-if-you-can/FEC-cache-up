import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import DeleteButton from './DeleteButton.jsx';

const OutfitCard = ({ productId, removeProduct }) => {
  const handleDelete = React.useCallback(() => {
    removeProduct(productId);
  }, [productId, removeProduct]);

  const renderDeleteIcon = (id) => (
    <DeleteButton productId={id} onDelete={removeProduct} />
  );

  return (
    <AbstractProductCard productId={productId} renderIcon={renderDeleteIcon} />
  );
};

OutfitCard.propTypes = {
  productId: PropTypes.string.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

OutfitCard.displayName = 'OutfitCard';

export default OutfitCard;
