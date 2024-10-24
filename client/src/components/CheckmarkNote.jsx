import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icons.jsx';
function CheckmarkNote({ label = 'undefined label' }) {
  return (
    <div className="container">
      <Icon icon="fa-check" />
    </div>
  );
}

CheckmarkNote.propTypes = {
  label: PropTypes.string,
};

export default CheckmarkNote;
