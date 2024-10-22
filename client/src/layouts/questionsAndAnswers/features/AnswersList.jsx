import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Answer from './Answer.jsx';

export default function AnswersList({ answers, question_id }) {

  const [currentAnswers, setCurrentAnswers] = useState(answers);
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const [moreIsHidden, setMoreIsHidden] = useState(false);
  const [cantLoadMore, setCantLoadMore] = useState(false);
  const [maxLoadedAnswers, setMaxLoadedAnswers] = useState(
    Object.keys(answers).length,
  );

  useEffect(() => {
    setMaxLoadedAnswers(Object.keys(currentAnswers).length);
  }, [currentAnswers])

  useEffect(() => {
    displayedAnswers > 2 ? setMoreIsHidden(false) : setMoreIsHidden(true);
  }, [displayedAnswers]);

  useEffect(() => {
    displayedAnswers >= maxLoadedAnswers
      ? setCantLoadMore(true)
      : setCantLoadMore(false);
  }, [displayedAnswers, maxLoadedAnswers]);

  const handleLoadMoreAnswers = () => {
    setDisplayedAnswers(Object.keys(answers).length);
  };

  const hideMoreAnswers = () => {
    setDisplayedAnswers(2);
  };

  const reloadAnswers = () => {
    axios.get(`/qa/answers?question_id=${question_id}`)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="answers-list">
      {Object.keys(answers)
        .sort((a, b) => answers[b].helpfulness - answers[a].helpfulness)
        .slice(0, displayedAnswers)
        .map((key) => {
          let answer = answers[key];
          return <Answer key={answer.id} answer={answer} />;
        })}
      {!cantLoadMore && (
        <button
          className="d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
          onClick={handleLoadMoreAnswers}
        >
          Load More Answers
        </button>
      )}
      {!moreIsHidden && (
        <button
          className="d-inline-flex text-secondary text-size-90 bg-transparent hstack border-0 shadow-none text-decoration-underline ps-1"
          onClick={hideMoreAnswers}
        >
          Hide More Answers
        </button>
      )}
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.object.isRequired,
  question_id: PropTypes.number.isRequired,
};
