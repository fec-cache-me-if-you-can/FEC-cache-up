import React from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import DeleteButton from './DeleteButton.jsx';

const OutfitCard = ({ productId, onDelete }) => {
  const renderDeleteIcon = (id) => (
    <DeleteButton productId={id} onDelete={onDelete} />
  );

  return (
    <AbstractProductCard productId={productId} renderIcon={renderDeleteIcon} />
  );
};

OutfitCard.propTypes = {
  productId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

OutfitCard.displayName = 'OutfitCard';

export default OutfitCard;
