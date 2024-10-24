import React from 'react';
import PropTypes from 'prop-types';

export default function AdditionalInfo({ slogan = '', description = '' }) {
  return (
    <div className="section bg-accent p-5 my-5 text-primary">
      <h4>{slogan}</h4>
      <p>{description}</p>
    </div>
  );
}

AdditionalInfo.propTypes = {
  slogan: PropTypes.string,
  description: PropTypes.string,
};
