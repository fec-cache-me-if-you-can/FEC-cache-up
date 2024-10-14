import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Answer from './Answer.jsx';

export default function AnswersList({ answers }) {
  const [displayedAnswers, setDisplayedAnswers] = useState(1);
  const [moreIsHidden, setMoreIsHidden] = useState(true);

  useEffect(() => {
    if (displayedAnswers > 1) {
      setMoreIsHidden(false);
    } else {
      setMoreIsHidden(true);
    }
  }, [displayedAnswers]);

  const handleLoadMoreAnswers = (e) => {
    setDisplayedAnswers((displayedAnswers) => displayedAnswers + 2);
  };

  const hideMoreAnswers = () => {
    setDisplayedAnswers(1);
  };

  console.log('answers object: ', answers);
  return (
    <div className="answers-list">
      {Object.keys(answers)
        .slice(0, displayedAnswers)
        .map((key) => {
          let answer = answers[key];
          console.log(answer);
          return <Answer key={answer.id} answer={answer} />;
        })}
      <button onClick={handleLoadMoreAnswers}>Load More Answers</button>
      <button onClick={hideMoreAnswers} hidden={moreIsHidden}>
        Hide More Answers
      </button>
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.object.isRequired,
};
