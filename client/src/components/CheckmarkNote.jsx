import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icons.jsx';
function CheckmarkNote({ label = 'undefined label' }) {
  return (
    <div
      className="d-flex align-items-center align-content-center justify-content-center"
      style={{ height: '10px', width: '10px' }}
    >
      <Icon icon="fa-check" />
    </div>
  );
}

CheckmarkNote.propTypes = {
  label: PropTypes.string,
};

export default CheckmarkNote;
