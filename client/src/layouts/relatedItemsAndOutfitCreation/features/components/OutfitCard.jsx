import React from 'react';
import PropTypes from 'prop-types';
import AbstractProductCard from './AbstractProductCard.jsx';
import DeleteButton from './DeleteButton.jsx';

const OutfitCard = ({ productId, action, setProductId }) => {
  const renderDeleteIcon = (id) => (
    <DeleteButton productId={id} onDelete={action} />
  );

  return (
    <AbstractProductCard
      productId={productId}
      renderIcon={renderDeleteIcon}
      setProductId={setProductId}
    />
  );
};

OutfitCard.propTypes = {
  productId: PropTypes.string,
  action: PropTypes.func,
  setProductId: PropTypes.func,
};

export default OutfitCard;
