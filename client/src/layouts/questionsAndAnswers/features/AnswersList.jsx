import React from 'react';
import PropTypes from 'prop-types';

import Answer from './Answer.jsx';

export default function AnswersList({ answers }) {
  return (
    <div className="answers-list">
      {answers.map((answer) => {
        console.log(answer);
        return <Answer key={answer.answerId} answer={answer} />;
      })}
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.array.isRequired,
};
