import React from 'react';

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
  return (
    <div id="app" className="container my-5">
      <div className="text-center mb-4">
        <PrimaryButton onClick={toggleTheme} label="Toggle Theme" />
      </div>
      <p className="lead">hello world</p>
      <h1 className="display-4">Hello World, but bigger.</h1>
      <div className="my-4">
        <ProductDetails />
      </div>
      <div className="my-4">
        <RatingsAndReviews />
      </div>
      <div className="my-4">
        <QuestionsAndAnswers />
      </div>
      <div className="my-4">
        <RelatedItemsAndOutfitCreation />
      </div>
      <div className="my-4">
        <TestComponent />
      </div>
    </div>
  );
}
