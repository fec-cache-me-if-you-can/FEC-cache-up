import React from 'react';

import Helpful from '../../../components/helpful.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';
import PropTypes from 'prop-types';

export default function Question({ question }) {
  const {
    answers,
    asker_name,
    question_body,
    question_date,
    question_helpfulness,
    reported,
  } = question;

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div
      className="question-card border border-dark-subtle shadow-sm p-3"
      hidden={reported}
    >
      <div className="-question-header row">
        <div className="question-text fs-4 col">Q: {question_body}</div>
        <div className="header-interaction col">
          <Helpful helpfulness={question_helpfulness} />
          <AddAnswer />
        </div>
      </div>
      <div className="question-footer">
        <AnswersList answers={answers} />
        <div className="question-date">
          {new Date(question_date).toLocaleDateString('en-US', dateOptions)}
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

{
  /* <div className="asker-name">{asker_name}</div> */
}
