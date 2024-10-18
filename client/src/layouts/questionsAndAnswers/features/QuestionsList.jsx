import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

import SearchQuestions from './SearchQuestions.jsx';
import Question from './Question.jsx';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import AddQuestion from './AddQuestion.jsx';

export default function QuestionsList({ productId }) {
  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState(4);
  const [moreIsHidden, setMoreIsHidden] = useState(true);
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    if (displayedQuestions > 4) {
      setMoreIsHidden(false);
    } else {
      setMoreIsHidden(true);
    }
  }, [displayedQuestions]);

  useEffect(() => {
    if (displayedQuestions >= questions.length) {
      setHideButton(true);
    } else {
      setHideButton(false);
    }
  }, [displayedQuestions, questions.length]);

  const handleLoadMoreQuestions = (e) => {
    setDisplayedQuestions((displayedQuestions) => displayedQuestions + 2);
  };
  const resetDisplayedQuestions = () => {
    setDisplayedQuestions(4);
  };

  useEffect(() => {
    axios
      .get(`/qa/questions?product_id=${productId}`)
      .then((result) => {
        setQuestions(result.data.results);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const createQuestion = () => {}; // TODO: make axios post question call

  return (
    <div className="question-list container-xl ">
      <div className="d-flex">
        <SearchQuestions />
        <PrimaryButton
          isDisabled={hideButton}
          label={'More Questions'}
          plus={true}
          onClick={handleLoadMoreQuestions}
          extraStyles={'m-3'}
        />
        <AddQuestion onClick={createQuestion} />
      </div>
      {questions.slice(0, displayedQuestions).map((question) => {
        return <Question key={question.question_id} question={question} />;
      })}
      <button hidden={moreIsHidden} onClick={resetDisplayedQuestions}>
        Hide More Questions
      </button>
    </div>
  );
}
QuestionsList.propTypes = {
  productId: PropTypes.number.isRequired,
};
