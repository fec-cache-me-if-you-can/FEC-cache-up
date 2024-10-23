import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Helpful from '../../../components/helpful.jsx';
import Report from '../../../components/report.jsx';
import AnswerPhoto from './AnswerPhoto.jsx';
import axios from 'axios';

export default function Answer({ answer }) {
  const { id, body, date, answerer_name, helpfulness, photos } = answer;
  const [howHelpful, setHowHelpful] = useState(helpfulness);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);

  const isHelpful = () => {
    if (!hasVotedHelpful) {
      axios
        .put('/qa/answers/helpful', { answer_id: id })
        .then(() => {
          setHowHelpful((current) => current + 1);
          setHasVotedHelpful(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const reportAnswer = () => {
    axios.put('/qa/answers/report', { answer_id: id })
      .catch((err) => console.log(err));
  };

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="answer-card p-3">
      <div className="fs-5 d-inline-flex">A: </div>
      <div className="fs-7 d-inline-flex ps-1">{body}</div>
      <div className="photoList">
        {photos.map((photo) => {
          <AnswerPhoto photo={photo} />;
        })}
      </div>
      <div className="answer-footer">
        <div className="fw-light text-size-90 d-inline-flex p-2">
          {answerer_name}
        </div>
        <div className="fw-lighter text-size-90 d-inline-flex p-2">
          {new Date(date).toLocaleDateString('en-US', dateOptions)}
        </div>
        <Helpful onClick={isHelpful} helpfulness={howHelpful} />
        <Report onClick={reportAnswer} />
      </div>
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};
