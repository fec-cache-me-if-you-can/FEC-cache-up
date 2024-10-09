import React from 'react';

import ProductDetails from './layouts/productDetails/index.jsx';
import RatingsAndReviews from './layouts/ratingsAndReviews/index.jsx';
import QuestionsAndAnswers from './layouts/questionsAndAnswers/index.jsx';
import RelatedItemsAndOutfitCreation from './layouts/relatedItemsAndOutfitCreation/index.jsx';

export default function App () {

  return (
    <div className="app">
      <ProductDetails />
      <RatingsAndReviews />
      <QuestionsAndAnswers />
      <RelatedItemsAndOutfitCreation />
    </div>
  );
}
