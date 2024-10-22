import React from 'react';

import { useState } from 'react';
import Helpful from '../../../components/helpful.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Question({ question }) {
  const {
    question_id,
    answers,
    asker_name,
    question_body,
    question_date,
    question_helpfulness,
    reported,
  } = question;

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const createAnswer = (body) => {
    console.log(body);
    body.question_id = question_id;
    return axios
      .post(`/qa/answers`, body)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className="question-card mb-5 mt-4 p-5 secondary-bg">
      <div className="d-flex flex-nowrap align-content- align-content-start justify-content-between">
        <div className="col-row-8 d-flex justify-content-center fs-4 fw-semibold">
          <div className="question-text d-inline-flex me-2">Q:</div>
          <div className="question-text mb-2">{question_body}</div>
        </div>
        <div className="header-interaction hstack col-4 d-flex align-content-start justify-content-end align-items-start">
          <Helpful helpfulness={question_helpfulness} />
          <div className="divider d-flex text-secondary align-items-start text-size-90">
            |
          </div>
          <AddAnswer onClick={createAnswer} />
        </div>
      </div>
      <div className="question-footer">
        <AnswersList answers={answers} question_id={question_id} />
        <div className="question-date text-size-90 text-secondary ms-4 px-2">
          {new Date(question_date).toLocaleDateString('en-US', dateOptions)}
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

{
  /* <div className="asker-name">{asker_name}</div> */
}
