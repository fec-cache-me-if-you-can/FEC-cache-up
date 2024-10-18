import React from 'react';
import PropTypes from 'prop-types';

export default function AnswerPhoto({ id, url }) {
  return <img src={url} alt={String(id)}></img>;
}

AnswerPhoto.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
