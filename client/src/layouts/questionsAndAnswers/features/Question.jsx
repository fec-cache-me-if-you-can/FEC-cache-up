import React from 'react';

import { useState, useEffect } from 'react';
import Helpful from '@/components/helpful.jsx';
import Report from '@/components/report.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswersList from './AnswersList.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';

export default function Question({ question, productName }) {
  /* eslint-disable */
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const [question_id, setQuestion_id] = useState(question.question_id);
  const [answers, setAnswers] = useState(question.answers);
  const [question_body, setQuestion_body] = useState(question.question_body);
  const [question_date, setQuestionDate] = useState(question.question_date);
  const [question_helpfulness, setQuestion_helpfulness] = useState(
    question.question_helpfulness,
  );
  /* eslint-enable */

  useEffect(() => {
    setAnswers(currentQuestion.answers);
  }, [currentQuestion]);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const [howHelpful, setHowHelpful] = useState(question_helpfulness);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);

  const createAnswer = (body) => {
    body.question_id = question_id;
    return axios
      .post(`/qa/answers`, body)
      .then(() => {
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

  const reportQuestion = () => {
    axios
      .put('/qa/questions/report', { question_id: question_id })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-3 p-md-5 mb-3 bg-secondary bg-opacity-50">
      <div className="row text-start">
        <div className="col-12 col-md-7 mb-3 mb-md-0">
          <div className="d-flex align-items-center">
            <div className="fs-3 fs-md-4 fs-sm-5 pe-2 fw-bold text-primary">
              Q:
            </div>
            <div className="fs-3 fs-md-4 fs-sm-5 fw-bold text-primary">
              {question.question_body}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-5">
          <div className="d-flex align-items-center flex-wrap flex-md-nowrap justify-content-start justify-content-md-end gap-2 pe-md-3">
            <Helpful onClick={isHelpful} helpfulness={howHelpful} />
            <div className="text-secondary d-none d-md-block">|</div>
            <AddAnswer
              onSubmit={createAnswer}
              productName={productName}
              questionBody={question_body}
            />
            <div className="text-secondary d-none d-md-block">|</div>
            <Report onClick={reportQuestion} />
          </div>
        </div>
      </div>

      <div>
        <AnswersList
          answers={answers}
          question_id={question_id}
          productName={productName}
        />
        <div className="d-inline-flex mt-2">
          <small className="text-secondary">
            {new Date(question_date).toLocaleDateString('en-US', dateOptions)}
          </small>
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  getQuestions: PropTypes.func.isRequired,
  setQuestions: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};
