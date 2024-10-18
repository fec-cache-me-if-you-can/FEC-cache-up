import React from 'react';
import OutfitList from './features/OutfitList.jsx';
import RelatedProductList from './features/RelatedProductList.jsx';
import PropTypes from 'prop-types';

// TODO: receive productId from the parent component
const RelatedItemsAndOutfitCreation = ({ productId = '40344' }) => {
  return (
    <div>
      <OutfitList />
      <RelatedProductList productId={productId} />
    </div>
  );
};

RelatedItemsAndOutfitCreation.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default RelatedItemsAndOutfitCreation;
