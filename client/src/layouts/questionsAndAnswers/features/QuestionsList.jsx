import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Question from './Question.jsx';

export default function QuestionsList({ productId }) {
  const [questions, setQuestions] = useState([]);

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
    <div className="question-list">
      {questions.map((question) => {
        return <Question key={question.question_id} question={question} />;
      })}
    </div>
  );
}

QuestionsList.propTypes = {
  productId: PropTypes.number.isRequired,
};
