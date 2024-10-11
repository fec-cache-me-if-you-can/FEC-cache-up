import React from 'react';

import Helpful from '../../../components/helpful.jsx';
import Report from '../../../components/report.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';
import PropTypes from 'prop-types';

export default function Question({
  answers,
  asker_name,
  question_body,
  question_date,
  question_helpfulness,
  question_id,
  reported,
}) {
  return (
    <div className="question-card" hidden={!reported}>
      <div className="-question-header">
        <div className="asker-name">{asker_name}</div>
        <div className="question-text">Q: {question_body}</div>
        <div className="header-interaction">
          <AddAnswer />
          <Helpful helpfulness={question_helpfulness} />
          <Report />
        </div>
      </div>
      <div className="question-footer">
        <AnswersList answers={answers} />
        <div className="question-date">{question_date}</div>
      </div>
    </div>
  );
}

Question.propTypes = {
  answers: PropTypes.array.isRequired,
  asker_name: PropTypes.string.isRequired,
  question_body: PropTypes.string.isRequired,
  question_date: PropTypes.string.isRequired,
  question_helpfulness: PropTypes.number.isRequired,
  question_id: PropTypes.number.isRequired,
  reported: PropTypes.boolean.isRequired,
};
