import React from 'react';
import PropTypes from 'prop-types';

import QuestionsList from './features/QuestionsList.jsx';

export default function QuestionsAndAnswers({ productId, productName }) {
  return (
    <>
      <h5 className="section-header">Questions And Answers</h5>
      <QuestionsList productId={productId} productName={productName} />
    </>
  );
}


QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};
