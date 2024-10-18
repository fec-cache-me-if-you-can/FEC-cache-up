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
  const [moreIsHidden, setMoreIsHidden] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    console.log('==================================');
    console.log('displayedQuestions', displayedQuestions);
    console.log('moreIsHidden', moreIsHidden);
    console.log('hideButton', hideButton);
    console.log('questions.length', questions.length);
    console.log('==================================');
  }, [displayedQuestions, moreIsHidden, hideButton, questions]);

  useEffect(() => {
    displayedQuestions > 4 ? setMoreIsHidden(false) : setMoreIsHidden(true);
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
      .get(`/qa/questions?product_id=${productId}&count=20`)
      .then((result) => {
        setQuestions(result.data.results);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const createQuestion = (body) => {
    body.product_id = productId;
    console.log(body);
    return axios.post('/qa/questions', body);
  };

  return (
    <div className="question-list container-xl ">
      <div className="d-flex align-items-lg-start">
        <SearchQuestions />
        <PrimaryButton
          isDisabled={hideButton}
          label={'More Questions'}
          plus={true}
          onClick={handleLoadMoreQuestions}
        />
        <AddQuestion onClick={createQuestion} />
      </div>
      {questions.slice(0, displayedQuestions).map((question) => {
        return <Question key={question.question_id} question={question} />;
      })}
      {!moreIsHidden && (
        <button onClick={resetDisplayedQuestions}>Hide More Questions</button>
      )}
    </div>
  );
}
QuestionsList.propTypes = {
  productId: PropTypes.number.isRequired,
};
