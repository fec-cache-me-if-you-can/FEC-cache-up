import React from 'react';
import PropTypes from 'prop-types';

export default function AdditionalInfo({ slogan = '', description = '' }) {
  return (
    <>
      <div className="border-bottom border-bottom-thick border-primary mt-5"></div>
      <div className="section py-5 text-primary border-bottom border-bottom-thick border-primary">
        <h4 className="pb-2 fs-3">{slogan}</h4>
        <p className="fs-5 fs-md-4">{description}</p>
      </div>
    </>
  );
}

AdditionalInfo.propTypes = {
  slogan: PropTypes.string,
  description: PropTypes.string,
};
