import React from 'react';
import PropTypes from 'prop-types';
import Helpful from '../../../components/helpful.jsx';
import AnswerPhoto from './AnswerPhoto.jsx';

export default function Answer({
  answerId,
  body,
  date,
  answerer_name,
  helpfulness,
  photos,
}) {
  return (
    <div className="answer-card">
      <div>{answerId}</div>
      <div>{body}</div>
      <div>{date}</div>
      <div>{answerer_name}</div>
      <Helpful helpfulness={helpfulness} />
      <div className="photoList">
        {photos.map((photo) => {
          <AnswerPhoto photo={photo} />;
        })}
      </div>
    </div>
  );
}

Answer.propTypes = {
  answerId: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  answerer_name: PropTypes.string.isRequired,
  helpfulness: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
};
