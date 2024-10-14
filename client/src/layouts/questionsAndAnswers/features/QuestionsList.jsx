import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question.jsx';

export default function QuestionsList({ productId }) {
  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState(1);

  const handleLoadMoreQuestions = (e) => {
    setDisplayedQuestions((displayedQuestions) => displayedQuestions + 2);
  };

  useEffect(() => {
    axios
      .get(`/qa/questions?product_id=${productId}`)
      .then((result) => {
        console.log(result.data.results);
        setQuestions(result.data.results);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  return (
    <div className="question-list container-xl ">
      {questions.map((question) => {
        console.log(question);
        return <Question key={question.question_id} question={question} />;
      })}
    </div>
  );
}
QuestionsList.propTypes = {
  productId: PropTypes.number.isRequired,
};
