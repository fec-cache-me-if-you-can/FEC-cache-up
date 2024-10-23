import React from 'react';
import PropTypes from 'prop-types';

import QuestionsList from './features/QuestionsList.jsx';

export default function QuestionsAndAnswers({ productId }) {
  return (
    <div className="p-1">
      <QuestionsList productId={productId} />
    </div>
  );
}


QuestionsAndAnswers.propTypes = {
  productId: PropTypes.number.isRequired,
};
