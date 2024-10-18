import React from 'react';

import QuestionsList from './features/QuestionsList.jsx';

export default function QuestionsAndAnswers() {
  return (
    <div className="border border-black p-1">
      <QuestionsList productId={40444} />
    </div>
  );
}
