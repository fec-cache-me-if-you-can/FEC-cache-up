import React from 'react';

import AddAnswer from './features/AddAnswer.jsx';
import AddQuestion from './features/AddQuestion.jsx';
import MoreAnsweredQuestions from './features/MoreAnsweredQuestions.jsx';
import Question from './features/Question.jsx';
import QuestionsList from './features/QuestionsList.jsx';
import SearchQuestions from './features/SearchQuestions.jsx';

export default function QuestionsAndAnswers() {
  return (
    <div>
      <AddAnswer />
      <AddQuestion />
      <MoreAnsweredQuestions />
      <Question questionId={40444} />
      <QuestionsList />
      <SearchQuestions />
    </div>
  );
}
