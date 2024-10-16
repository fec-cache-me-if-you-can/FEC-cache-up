import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import DeleteButton from './DeleteButton.jsx';

const OutfitCard = ({ productId, action }) => {
  const handleDelete = useCallback(() => {
    action(productId);
  }, [productId, action]);

  const renderDeleteIcon = (id) => (
    <DeleteButton productId={id} onDelete={action} />
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
