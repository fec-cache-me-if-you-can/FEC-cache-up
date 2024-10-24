import React from 'react';
import PropTypes from 'prop-types';

export default function AdditionalInfo({ slogan = '', description = '' }) {
  return (
    <div className="section bg-accent p-5 my-5 text-primary">
      <h4 className="pt-5 pb-2 fs-3">{slogan}</h4>
      <p className="pb-5 fs-5 fs-md-4">{description}</p>
    </div>
  );
}

AdditionalInfo.propTypes = {
  slogan: PropTypes.string,
  description: PropTypes.string,
};
