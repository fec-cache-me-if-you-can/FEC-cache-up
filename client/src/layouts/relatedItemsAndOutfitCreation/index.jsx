import React from 'react';
import PropTypes from 'prop-types';

import OutfitList from './features/OutfitList.jsx';
import RelatedProductCard from './features/RelatedProductCard.jsx';
import RelatedProductList from './features/RelatedProductList.jsx';

export default function RelatedItemsAndOutfitCreation({ productId = '40344' }) {
  return (
    <div>
      {/* <OutfitList /> */}
      <RelatedProductList productId={'40344'} />
    </div>
  );
}

RelatedItemsAndOutfitCreation.propTypes = {
  productId: PropTypes.string.isRequired,
};
