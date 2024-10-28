import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/icons.jsx';

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

  const buttonClass = `btn btn-primary square m-3 px-3 py-2 fs-5 ${isProductInOutfit ? 'disabled' : ''}`;
  const buttonIcon = isProductInOutfit ? 'fa-check' : 'fa-plus';
  const buttonText = isProductInOutfit ? 'added' : 'add to outfit';
  const ariaLabel = isProductInOutfit
    ? 'Product already in outfit'
    : 'Add product to outfit';

  return (
    <button
      onClick={handleAddToOutfit}
      className={buttonClass}
      style={{
        minWidth: '40px',
        minHeight: '40px',
        padding: '0',
      }}
      disabled={isProductInOutfit}
      aria-label={ariaLabel}
      aria-pressed={isProductInOutfit}
    >
      <Icon icon={buttonIcon} aria-hidden="true" />
      <span className="ms-2">{buttonText}</span>
    </button>
  );
};

AddToOutfitCard.propTypes = {
  productId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
};

export default memo(AddToOutfitCard);
