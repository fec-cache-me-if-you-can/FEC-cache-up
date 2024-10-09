import React from 'react';

import ProductInformation from './features/ProductInformation.jsx'
import ImageGallery from './features/ImageGallery.jsx'
import AddToCart from './features/AddToCart.jsx'
import StyleSelector from './features/StyleSelector.jsx'

export default function ProductDetails() {

  return (
    <div>Product Details</div>
    <ProductInformation />
    <ImageGallery />
    <AddToCart />
    <StyleSelector />
  );
}
