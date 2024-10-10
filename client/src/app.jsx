import React from 'react';

import ProductDetails from './layouts/productDetails/index.jsx';
import RatingsAndReviews from './layouts/ratingsAndReviews/index.jsx';
import QuestionsAndAnswers from './layouts/questionsAndAnswers/index.jsx';
import RelatedItemsAndOutfitCreation from './layouts/relatedItemsAndOutfitCreation/index.jsx';
import TestComponent from './components/test.jsx';

export default function App () {

  return (
    <div className="app">
      <p>hello world</p>
      <ProductDetails />
      <RatingsAndReviews />
      <QuestionsAndAnswers />
      <RelatedItemsAndOutfitCreation />
      <TestComponent />
    </div>
  );
}
