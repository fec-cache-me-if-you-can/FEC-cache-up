import React from 'react';
import PropTypes from 'prop-types';

export default function AdditionalInfo({ slogan = '', description = '' }) {
  return (
    <div style={{ width: '75%' }}>
      <h3>{slogan}</h3>
      <p>{description}</p>
    </div>
  );
}

AdditionalInfo.propTypes = {
  slogan: PropTypes.string,
  description: PropTypes.string,
};
