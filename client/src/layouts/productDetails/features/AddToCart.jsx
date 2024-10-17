import React, { useEffect, useState } from 'react';
import DropdownSelector from '../../../components/DropdownSelector.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import PropTypes from 'prop-types';

export default function AddToCart({
  productId,
  selectedStyleId,
  sizes,
  selectedSize,
  quantity,
  selectedQuantity,
  onSizeChange,
  onQuanChange,
  showSizeError,
  handleAddToCart,
}) {
  const [isSizesDisabled, setIsSizesDisabled] = useState(true);
  const [isQuantDisabled, setIsQuantDisabled] = useState(true);

  useEffect(() => {
    setIsSizesDisabled(sizes.length === 0);
  }, [sizes]);

  useEffect(() => {
    setIsQuantDisabled(!selectedSize);
  }, [selectedSize]);

  return (
    <div>
      {showSizeError && <p style={{ color: 'red' }}>Please select a size</p>}
      <div className="cart-selectors-container">
        {/* sizes */}
        <DropdownSelector
          options={sizes}
          placeholder={sizes.length === 0 ? 'OUT OF STOCK' : 'Select Size'}
          isDisabled={isSizesDisabled}
          onChange={onSizeChange}
          selectedOption={selectedSize}
          className="size-selector"
        />
        {/* quantities */}
        <DropdownSelector
          options={quantity}
          placeholder="-"
          isDisabled={isQuantDisabled}
          onChange={onQuanChange}
          selectedOption={selectedQuantity}
          className="quantity-selector"
        />
      </div>
      {sizes.length !== 0 ? (
        <PrimaryButton
          label="Add to Cart"
          onClick={handleAddToCart}
          className="full-width-button"
        />
      ) : null}
    </div>
  );
}

AddToCart.propTypes = {
  productId: PropTypes.number,
  selectedStyleId: PropTypes.number,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSize: PropTypes.string,
  quantity: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedQuantity: PropTypes.number,
  onSizeChange: PropTypes.func,
  onQuanChange: PropTypes.func,
  showSizeError: PropTypes.bool,
  handleAddToCart: PropTypes.func,
};
