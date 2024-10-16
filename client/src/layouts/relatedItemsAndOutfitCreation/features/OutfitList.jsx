// components/OutfitList.jsx
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useOutfitData } from './hooks/UseOutfitData.jsx';
import OutfitCard from './components/OutfitCard.jsx';
import AbstractList from './AbstractList.jsx';

const OutfitList = () => {
  const { outfitIds, isLoading, error, addProduct, removeProduct } =
    useOutfitData();

  console.log('OutfitList rendered with:', {
    outfitIds,
  });

  const createTestOutfit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('createTestOutfit called');
      addProduct('40344');
    },
    [addProduct],
  );

  console.log('OutfitList rendered with addProduct:', addProduct);

  return (
    <>
      <button onClick={createTestOutfit}>Add Test Outfit product</button>
      <AbstractList
        items={outfitIds}
        isLoading={isLoading}
        error={error}
        heading="Your Outfit"
        CardComponent={OutfitCard}
        action={removeProduct}
      />
    </>
  );
};

export default OutfitList;
