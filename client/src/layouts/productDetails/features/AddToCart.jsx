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
      {showSizeError && <p style={{ color: 'red' }}>Please select a size</p>}
      <div className="d-flex gap-3">
        {/* d-flex: creates a flex container */}
        {/* gap-3: adds spacing between flex items */}
        <div className="flex-grow-1 flex-basis-0">
          {/* flex-grow-1: allows the item to grow */}
          {/* flex-basis-0: sets the initial main size of the item to 0 */}
          <DropdownSelector
            options={sizes}
            placeholder={sizes.length === 0 ? 'OUT OF STOCK' : 'Select Size'}
            isDisabled={isSizesDisabled}
            onChange={onSizeChange}
            selectedOption={selectedSize}
          />
        </div>
        <div className="flex-grow-1 flex-basis-0">
          {/* flex-grow-1: allows the item to grow */}
          {/* flex-basis-0: sets the initial main size of the item to 0 */}
          <DropdownSelector
            options={quantity}
            placeholder="-"
            isDisabled={isQuantDisabled}
            onChange={onQuanChange}
            selectedOption={selectedQuantity}
          />
        </div>
      </div>
      {/* <div> */}
      {/* uncomment above div for a half width button (prevents button from acting a flex item) */}

      {sizes.length !== 0 ? (
        <PrimaryButton
          label="Add to Cart"
          onClick={handleAddToCart}
          plus={true}
        />
      ) : null}
      {/* </div> */}
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
