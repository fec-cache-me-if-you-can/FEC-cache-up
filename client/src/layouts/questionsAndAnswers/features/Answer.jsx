import React from 'react';
import PropTypes from 'prop-types';

import Helpful from '../../../components/helpful.jsx';
import Report from '../../../components/report.jsx';
import AnswerPhoto from './AnswerPhoto.jsx';

export default function Answer({ answer }) {
  const { id, body, date, answerer_name, helpfulness, photos } = answer;

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="answer-card my-2">
      <div className="d-flex align-content-center fw-normal">
        <div className="fs-5 fw-semibold d-inline-flex me-1">A: </div>
        <div className="fs-7 ps-2 align-content-start mt-1">
          {body}
          <div className="photoList">
            {photos.map((photo) => {
              <AnswerPhoto photo={photo} />;
            })}
          </div>
          <div className="answer-footer text-secondary d-flex align-content-center justify-content-start">
            <div className="text-size-90 me-2">{answerer_name}</div>
            <div className="text-size-90 d-inline-flex px-2">
              {new Date(date).toLocaleDateString('en-US', dateOptions)}
            </div>
            <Helpful helpfulness={helpfulness} />
            <Report />
          </div>
        </div>
      </div>
      <div className="photoList">
        {photos.map((photo) => {
          <AnswerPhoto photo={photo} />;
        })}
      </div>
    </div>
  );
}
//
Answer.propTypes = {
  answer: PropTypes.object.isRequired,
};
