import React from 'react';

import Helpful from '../../../components/helpful.jsx';
import Report from '../../../components/report.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';
import PropTypes from 'prop-types';

export default function Question({ questionId }) {
  return (
    <div className="question-card">
      <div className="-question-header">
        <div className="question-text">Q: foo</div>
        <div className="header-interaction">
          <AddAnswer />
          <Helpful helpfulness={5} />
          <Report />
        </div>
      </div>
      <div className="question-footer">
        <AnswersList questionId={questionId} />
      </div>
    </div>
  );
}

Question.propTypes = {
  questionId: PropTypes.number.isRequired,
};
