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
    axios
      .put('/qa/answers/report', { answer_id: id })
      .catch((err) => console.log(err));
  };

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="answer-card py-2 py-md-3">
      {/* Answer Content */}
      <div className="d-flex align-items-start">
        <div className="text-primary fs-5 fs-md-6 fw-medium">A:</div>
        <div className="text-primary fs-5 fs-md-6 fw-medium ps-2">{body}</div>
      </div>

      {/* Photos */}
      <div className="photoList ms-2 ms-md-4 mt-2">
        {photos.map((photo, i) => (
          <AnswerPhoto photo={photo} key={i} />
        ))}
      </div>

      {/* Footer */}
      <div className="answer-footer d-flex flex-wrap gap-2 justify-content-start align-items-center mt-2">
        <div className="text-secondary small">{answerer_name}</div>
        <div className="text-secondary small">
          {new Date(date).toLocaleDateString('en-US', dateOptions)}
        </div>
        <div className="vr d-none d-md-block"></div>
        <Helpful onClick={isHelpful} helpfulness={howHelpful} />
        <div className="vr d-none d-md-block"></div>
        <Report onClick={reportAnswer} />
      </div>
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};
