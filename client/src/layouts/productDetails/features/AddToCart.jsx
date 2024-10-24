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
    <div className="d-flex flex-column gap-3">
      {showSizeError && (
        <p className="text-attention mb-0">Please select a size</p>
      )}
      <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
        <div className="flex-grow-1">
          <DropdownSelector
            options={sizes}
            placeholder={sizes.length === 0 ? 'OUT OF STOCK' : 'Select Size'}
            isDisabled={isSizesDisabled}
            onChange={onSizeChange}
            selectedOption={selectedSize}
          />
        </div>
        <div className="flex-grow-1">
          <DropdownSelector
            options={quantity}
            placeholder="-"
            isDisabled={isQuantDisabled}
            onChange={onQuanChange}
            selectedOption={selectedQuantity}
          />
        </div>
      </div>

      {sizes.length !== 0 && (
        <div className="w-100 w-sm-auto">
          <PrimaryButton
            label="Add to Cart"
            onClick={handleAddToCart}
            plus={true}
          />
        </div>
      )}
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
