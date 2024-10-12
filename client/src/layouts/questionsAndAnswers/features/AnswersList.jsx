import React from 'react';
import PropTypes from 'prop-types';

import Answer from './Answer.jsx';

export default function AnswersList({ answers }) {
  console.log('answers object: ', answers);
  return (
    <div className="answers-list">
      {Object.keys(answers).map((key) => {
        let answer = answers[key];
        console.log(answer);
        return <Answer key={answer.id} answer={answer} />;
      })}
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.object.isRequired,
};
