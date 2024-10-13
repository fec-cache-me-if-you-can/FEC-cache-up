import React, { useEffect, useState } from 'react';
import DropdownSelector from '../../../components/DropdownSelector.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import PropTypes from 'prop-types';

export default function AddToCart({
  selectedStyle,
  sizes,
  selectedSize,
  quantity,
  selectedQuantity,
  onSizeChange,
  onQuanChange,
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);

  useEffect(() => {
    setIsDropdownDisabled(!selectedSize);
  }, [selectedSize]);

  useEffect(() => {
    setIsButtonDisabled(!(selectedSize && selectedQuantity));
  }, [selectedSize, selectedQuantity]);

  const handleAddToCart = () => {
    console.log('Adding to cart:', { selectedSize, selectedQuantity });
  };

  return (
    <div>
      {/* sizes */}
      <DropdownSelector
        options={sizes}
        placeholder="Select Size"
        isDisabled={false}
        onChange={onSizeChange}
      />
      {/* quantities */}
      <DropdownSelector
        options={quantity}
        placeholder="Select Quantity"
        isDisabled={isDropdownDisabled}
        onChange={onQuanChange}
      />
      <PrimaryButton
        label="Add to Cart"
        onClick={handleAddToCart}
        isDisabled={isButtonDisabled}
      />
    </div>
  );
}

AddToCart.propTypes = {
  selectedStyle: PropTypes.object,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSize: PropTypes.string,
  quantity: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedQuantity: PropTypes.number,
  onSizeChange: PropTypes.func,
  onQuanChange: PropTypes.func,
};
