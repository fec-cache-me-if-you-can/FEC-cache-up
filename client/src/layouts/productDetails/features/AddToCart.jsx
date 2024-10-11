import React, { useEffect, useState } from 'react';
import DropdownSelector from '../../../components/DropdownSelector.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import axios from 'axios';

export default function AddToCart ({productId = 40344}) {

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [quantityOptions, setQuantityOptions] = useState([]);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loadingSizes, setLoadingSizes] = useState(true);

  useEffect(() => {
    axios.get('/products/styles', { product_id: productId })
      .then((response) => {
        console.log("response: ", response);
        const skus = response.data.results[0].skus;
        const availableSizes = Object.values(skus).map((sku) => ({
          size: sku.size,
          quantity: sku.quantity,
        }));
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

  const selectedSku = sizeOptions.find((option) => option.size === size);
  if (selectedSku && selectedSku.quantity > 0) {
    const quantities = Array.from({ length: Math.min(selectedSku.quantity, 15) }, (_, i) => i + 1);
    setQuantityOptions(quantities);
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
      defaultText="Select Size"
      isDisabled={loadingSizes}
      onChange={handleSizeChange}
    />
    <DropdownSelector
        options={quantityOptions.map((quantity) => ({ size: quantity }))}
        defaultText="Select Quantity"
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



