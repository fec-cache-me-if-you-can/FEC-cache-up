import React from 'react';

import { useState, useEffect } from 'react';
import Helpful from '../../../components/helpful.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Question({ question }) {
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const [question_id, setQuestion_id] = useState(question.question_id);
  const [answers, setAnswers] = useState(question.answers);
  const [question_body, setQuestion_body] = useState(question.question_body);
  const [question_date, setQuestionDate] = useState(question.question_date);
  const [question_helpfulness, setQuestion_helpfulness] = useState(
    question.question_helpfulness,
  );

  useEffect(() => {
    console.log(currentQuestion);
    setAnswers(currentQuestion.answers);
  }, [currentQuestion]);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const [howHelpful, setHowHelpful] = useState(question_helpfulness);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);

  const createAnswer = (body) => {
    console.log(body);
    body.question_id = question_id;
    return axios
      .post(`/qa/answers`, body)
      .then(() => {
        console.log('aaa');
        axios
          .get(`/qa/questions/${question_id}/answers`)
          .then((result) => setAnswers(result.data.results))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const isHelpful = () => {
    if (!hasVotedHelpful) {
      axios
        .put('/qa/questions/helpful', { question_id: question_id })
        .then(() => {
          setHowHelpful((current) => current + 1);
          setHasVotedHelpful(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="question-card p-3">
      <div className="-question-header row text-start d-flex">
        <div className="question-main col-8 d-inline-flex">
          <div className="question-text fs-4 d-inline-flex pe-2">Q:</div>
          <div className="question-text fs-5 d-inline-flex ">
            {question_body}
          </div>
        </div>
        <div className="header-interaction col-4 d--flex ">
          <Helpful onClick={isHelpful} helpfulness={howHelpful} />
          <div className="divider ps-1 pe-1 d-inline-flex ">|</div>
          <AddAnswer onClick={createAnswer} />
        </div>
      </div>
      <div className="question-footer">
        <AnswersList answers={answers} question_id={question_id} />
        <div className="question-date d-inline-flex fs-12">
          {new Date(question_date).toLocaleDateString('en-US', dateOptions)}
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};
