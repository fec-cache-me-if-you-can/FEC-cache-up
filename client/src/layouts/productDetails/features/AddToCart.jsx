import React, { useEffect, useState } from 'react';
import DropdownSelector from '../../../components/DropdownSelector.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function AddToCart({ productId = 40344 }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [skus, setSkus] = useState({});

  useEffect(() => {
    axios
      .get(`/products/${productId}/styles`)
      .then((response) => {
        console.log('response: ', response);
        const styleSkus = response.data.results[0].skus;
        const availableSizes = Object.values(styleSkus).map((sku) => ({
          size: sku.size,
          quantity: sku.quantity,
        }));
        setSkus(styleSkus);
        setSizeOptions(availableSizes);
        setLoadingSizes(false);
      })
      .catch((error) => {
        console.error('Error fetching product styles:', error);
        setLoadingSizes(false);
      });
  }, [productId]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const selectedSkuKey = Object.keys(skus).find(
      (key) => skus[key].size === size,
    );
    if (selectedSkuKey && skus[selectedSkuKey].quantity > 0) {
      const selectedSku = skus[selectedSkuKey];
      const quantities = Array.from(
        { length: Math.min(selectedSku.quantity, 15) },
        (_, i) => i + 1,
      );
      setQuantityOptions(quantities);
      console.log('setQuantityOptions: ', quantities);
      setIsDropdownDisabled(false);
    } else {
      setQuantityOptions([]);
      setIsDropdownDisabled(true);
    }
    setSelectedQuantity('');
    setIsButtonDisabled(true);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
    setIsButtonDisabled(!quantity);
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', { selectedSize, selectedQuantity });
  };

  return (
    <div>
      <DropdownSelector
        options={sizeOptions}
        placeholder="Select Size"
        isDisabled={loadingSizes}
        onChange={handleSizeChange}
      />
      <DropdownSelector
        options={quantityOptions}
        placeholder="Select Quantity"
        isDisabled={isDropdownDisabled}
        onChange={handleQuantityChange}
      />
      <PrimaryButton
        label="Add to Cart"
        onClick={handleAddToCart}
        isDisabled={isButtonDisabled}
      />
    </div>
  );
}

AddToCart.propTypes = { productId: PropTypes.number };
