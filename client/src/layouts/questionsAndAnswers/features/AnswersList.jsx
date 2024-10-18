import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Answer from './Answer.jsx';

export default function AnswersList({ answers, question_id }) {
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [moreIsHidden, setMoreIsHidden] = useState(true);
  const [cantLoadMore, setCantLoadMore] = useState(false);
  const [maxLoadedAnswers, setMaxLoadedAnswers] = useState(
    Object.keys(answers).length,
  );

  useEffect(() => {
    if (displayedAnswers > 2) {
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
    setDisplayedAnswers(2);
  };

  return (
    <div className="answers-list">
      {Object.keys(answers)
        .slice(0, displayedAnswers)
        .map((key) => {
          let answer = answers[key];
          return <Answer key={answer.id} answer={answer} />;
        })}
      <button
        className="d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
        onClick={handleLoadMoreAnswers}
        hidden={cantLoadMore}
      >
        Load More Answers
      </button>
      <button
        className="d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
        onClick={hideMoreAnswers}
        hidden={moreIsHidden}
      >
        Hide More Answers
      </button>
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.object.isRequired,
  question_id: PropTypes.number.isRequired,
};
