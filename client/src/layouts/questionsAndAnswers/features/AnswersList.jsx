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
  }, [currentAnswers]);

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
    axios
      .get(`/qa/answers?question_id=${question_id}`)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="answers-list">
      <div>
        {Object.keys(answers)
          .sort((a, b) => answers[b].helpfulness - answers[a].helpfulness)
          .slice(0, displayedAnswers)
          .map((key) => (
            <Answer key={answers[key].id} answer={answers[key]} />
          ))}
      </div>

      <div className="answers-navigation d-flex flex-column flex-md-row gap-2 gap-md-3 pt-2 mt-2">
        {!cantLoadMore && (
          <button
            className="text-secondary bg-transparent border-0 text-decoration-underline ps-0 fs-7 fs-md-6"
            onClick={handleLoadMoreAnswers}
          >
            Load more answers
          </button>
        )}
        {!moreIsHidden && (
          <button
            className="text-secondary bg-transparent border-0 text-decoration-underline ps-0 fs-7 fs-md-6"
            onClick={hideMoreAnswers}
          >
            Hide answers
          </button>
        )}
      </div>
    </div>
  );
}

AnswersList.propTypes = {
  answers: PropTypes.object.isRequired,
  question_id: PropTypes.number.isRequired,
};
