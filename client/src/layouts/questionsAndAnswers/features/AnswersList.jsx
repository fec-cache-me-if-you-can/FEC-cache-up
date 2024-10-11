import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Answer from './Answer.jsx';

export default function AnswersList({ questionId }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`/qa/questions/${questionId}/answers`)
      .then((result) => setAnswers(result))
      .catch((err) => console.log(err));
  }, [questionId]);

  return (
    <div className="answers-list">
      {answers.map((answer) => {
        <Answer answer={answer} />;
      })}
    </div>
  );
}

AnswersList.propTypes = {
  questionId: PropTypes.number.isRequired,
};
