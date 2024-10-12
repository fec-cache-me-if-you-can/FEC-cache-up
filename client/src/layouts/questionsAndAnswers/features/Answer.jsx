import React from 'react';
import PropTypes from 'prop-types';
import Helpful from '../../../components/helpful.jsx';
import AnswerPhoto from './AnswerPhoto.jsx';

export default function Answer({ answer }) {
  const { id, body, date, answerer_name, helpfulness, photos } = answer;
  return (
    <div className="answer-card">
      <div>{id}</div>
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
  answer: PropTypes.object.isRequired,
};
