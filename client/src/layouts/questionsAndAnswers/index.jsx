import React from 'react';
import PropTypes from 'prop-types';

import QuestionsList from './features/QuestionsList.jsx';

export default function QuestionsAndAnswers({ productId, productName }) {
  return (
    <div className="p-1">
      <QuestionsList productId={productId} productName={productName} />
    </div>
  );
}


QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
