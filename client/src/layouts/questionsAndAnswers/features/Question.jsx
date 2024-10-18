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
    <div
      className="question-card border border-dark-subtle shadow-sm p-3"
      hidden={reported}
    >
      <div className="-question-header row text-start d-flex">
        <div className="question-main col-8 d-inline-flex">
          <div className="question-text fs-4 d-inline-flex pe-2">Q:</div>
          <div className="question-text fs-5 d-inline-flex ">
            {question_body}
          </div>
        </div>
        <div className="header-interaction col-4 d--flex ">
          <Helpful helpfulness={question_helpfulness} />
          <div className="divider ps-1 pe-1 d-inline-flex ">|</div>
          <AddAnswer onClick={createAnswer} />
        </div>
      </div>
      <div className="question-footer">
        <AnswersList answers={answers} question_id={question_id} />
        <div className="question-date fs-12">
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
