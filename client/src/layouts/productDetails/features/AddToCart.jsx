import React from 'react';
import { useEffect, useState } from 'react';
import DropdownSelector from '../../../components/DropdownSelector.jsx';
// import axios from 'axios';

export default function AddToCart() {
  const [selectedSize, setSelectedSize] = useState('');
  // const [selectedQuantity, setSelectedQuantity] = useState('');
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);

  const handleSizeChange = (size) => {
    console.log('Selected size:', size);
    setSelectedSize(size);
  };

  const sizeOptions = [
    { size: 'S', skuId: 1 },
    { size: 'M', skuId: 2 },
    { size: 'L', skuId: 3 },
    { size: 'XL', skuId: 4 },
  ];

  return (
    <div>
      <DropdownSelector
        options={sizeOptions}
        placeholder="Select Size"
        isDisabled={isDropdownDisabled}
        onChange={handleSizeChange}
      />
    </div>
  );
}
