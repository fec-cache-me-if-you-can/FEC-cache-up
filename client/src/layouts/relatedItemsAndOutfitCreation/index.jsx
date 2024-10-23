import React from 'react';
import OutfitList from './features/OutfitList.jsx';
import RelatedProductList from './features/RelatedProductList.jsx';
import PropTypes from 'prop-types';

// TODO: receive productId from the parent component
const RelatedItemsAndOutfitCreation = ({ productId, setProductId }) => {
  return (
    <>
      <RelatedProductList productId={productId} setProductId={setProductId} />
      <OutfitList selectedProduct={productId} setProductId={setProductId} />
    </>
  );
};

RelatedItemsAndOutfitCreation.propTypes = {
  productId: PropTypes.string.isRequired,
  setProductId: PropTypes.func.isRequired,
};

export default RelatedItemsAndOutfitCreation;
