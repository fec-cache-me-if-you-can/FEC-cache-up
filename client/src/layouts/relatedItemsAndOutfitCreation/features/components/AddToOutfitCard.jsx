import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/icons.jsx';
import PrimaryButton from '../../../../components/PrimaryButton.jsx';

const AddToOutfitCard = ({ productId, action, items = [] }) => {
  const handleAddToOutfit = (event) => {
    event.preventDefault();
    if (typeof action === 'function') {
      action(productId);
    } else {
      console.error('action is not a function');
    }
  };

  const isProductInOutfit = items.includes(productId);

  return (
    <button
      onClick={handleAddToOutfit}
      className={`btn btn-primary square m-3 pe-1 ps-1 ${isProductInOutfit ? 'disabled' : ''}`}
      style={{ minWidth: '40px', minHeight: '40px', padding: '0' }}
      disabled={isProductInOutfit}
      aria-label={
        isProductInOutfit
          ? 'Product already in outfit'
          : 'Add product to outfit'
      }
    >
      <Icon icon={isProductInOutfit ? 'fa-check' : 'fa-plus'} />
    </button>
  );
};

AddToOutfitCard.propTypes = {
  productId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
};

export default AddToOutfitCard;
