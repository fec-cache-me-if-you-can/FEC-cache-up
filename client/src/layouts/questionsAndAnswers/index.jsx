import React from 'react';

import MoreAnsweredQuestions from './features/MoreAnsweredQuestions.jsx';
import QuestionsList from './features/QuestionsList.jsx';
import SearchQuestions from './features/SearchQuestions.jsx';
import PrimaryButton from '../../components/PrimaryButton.jsx';

export default function QuestionsAndAnswers() {
  return (
    <div>
      <SearchQuestions />
      <MoreAnsweredQuestions />
      <QuestionsList productId={40444} />
      <PrimaryButton label={'More Answered Questions'} />
      <PrimaryButton plus={true} label={'Add a Question'} />
    </div>
  );
}
