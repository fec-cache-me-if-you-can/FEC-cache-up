import React from 'react';
import PropTypes from 'prop-types';

export default function AdditionalInfo({ slogan = '', description = '' }) {
  return (
    <div className="section py-5 text-primary">
      <h4 className="pb-2 fs-3">{slogan}</h4>
      <p className="fs-5 fs-md-4">{description}</p>
    </div>
  );
}

AdditionalInfo.propTypes = {
  slogan: PropTypes.string,
  description: PropTypes.string,
};
