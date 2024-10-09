import React from 'react';

import OutfitList from './features/OutfitList.jsx';
import RelatedProductCard from './features/RelatedProductCard.jsx';
import RelatedProductList from './features/RelatedProductList.jsx';

export default function RelatedItemsAndOutfitCreation () {

  return (
    <div>
      <div>Related Items And Outfit Creation</div>
      <OutfitList />
      <RelatedProductCard />
      <RelatedProductList />
    </div>
  );
}