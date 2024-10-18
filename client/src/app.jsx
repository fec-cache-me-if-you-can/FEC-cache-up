import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetails from './layouts/productDetails/index.jsx';
import RatingsAndReviews from './layouts/ratingsAndReviews/index.jsx';
import QuestionsAndAnswers from './layouts/questionsAndAnswers/index.jsx';
import RelatedItemsAndOutfitCreation from './layouts/relatedItemsAndOutfitCreation/index.jsx';
import TestComponent from './components/test.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';

//! styling helper
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
};
export default function App() {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState('40344');

  useEffect(() => {
    const fetchData = async (productId) => {
      const { data } = await axios.get(`/products/${productId}/information`);
      setProduct(data);
    };

    fetchData(productId);
  }, [productId]);

  return (
    <div id="app" className="container my-5">
      <div className="text-center mb-4">
        <PrimaryButton onClick={toggleTheme} label="Toggle Theme" />
      </div>
      <p className="lead">hello world</p>
      <h1 className="display-4">Hello World, but bigger.</h1>
      <div className="my-4">
        {product.id ? (
          <ProductDetails product={product} />
        ) : (
          <p>Loading product...</p>
        )}
      </div>
      <div className="my-4">
        <RatingsAndReviews />
      </div>
      <div className="my-4">
        <QuestionsAndAnswers />
      </div>
      <div className="my-4">
        {productId && (
          <RelatedItemsAndOutfitCreation productId={String(product.id)} />
        )}
      </div>
      <div className="my-4">
        {/* leave this line commented out, only for Daniel to turn on and off: */}
        {/* <TestComponent /> */}
      </div>
    </div>
  );
}
