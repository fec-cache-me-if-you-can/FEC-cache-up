import React from 'react';

import QuestionsList from './features/QuestionsList.jsx';

export default function QuestionsAndAnswers() {
  return (
    <div>
      <h5 className="section-header fw-medium">Q & A</h5>
      <QuestionsList productId={40444} />
    </div>
  );
}
