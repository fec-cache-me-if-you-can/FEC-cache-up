import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Answer from './Answer.jsx';

export default function AnswersList({ answers }) {
  const [displayedAnswers, setDisplayedAnswers] = useState(1);
  const [moreIsHidden, setMoreIsHidden] = useState(true);
  const [cantLoadMore, setCantLoadMore] = useState(false);
  const [maxLoadedAnswers, setMaxLoadedAnswers] = useState(
    Object.keys(answers).length,
  );

  useEffect(() => {
    if (displayedAnswers > 1) {
      setMoreIsHidden(false);
    } else {
      setMoreIsHidden(true);
    }
  }, [displayedAnswers]);

  useEffect(() => {
    if (displayedAnswers >= maxLoadedAnswers) {
      setCantLoadMore(true);
    } else {
      setCantLoadMore(false);
    }
  }, [displayedAnswers, maxLoadedAnswers]);

  const handleLoadMoreAnswers = () => {
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
      <button onClick={handleLoadMoreAnswers} hidden={cantLoadMore}>
        Load More Answers
      </button>
      <button onClick={hideMoreAnswers} hidden={moreIsHidden}>
        Hide More Answers
      </button>
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.object.isRequired,
};
