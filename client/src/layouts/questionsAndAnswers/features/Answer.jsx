import React from 'react';
import PropTypes from 'prop-types';

import Helpful from '../../../components/helpful.jsx';
import Report from '../../../components/report.jsx';
import AnswerPhoto from './AnswerPhoto.jsx';

export default function Answer({ answer }) {
  const { id, body, date, answerer_name, helpfulness, photos } = answer;

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="answer-card border-2 border border-dark-subtle shadow-sm p-3">
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
        <Helpful helpfulness={helpfulness} />
        <Report />
      </div>
    </div>
  );
}

Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};
