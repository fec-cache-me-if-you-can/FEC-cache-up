import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icons.jsx';
function CheckmarkNote({ label = 'undefined label' }) {
  return (
    <div className="container">
      <Icon icon="fa-check" />
      {/* Eve commented the lable out since it is printed on the image */}
      {/* <span className="body-color ms-2">{label}</span> */}
    </div>
  );
}

CheckmarkNote.propTypes = {
  label: PropTypes.string,
};

export default CheckmarkNote;
