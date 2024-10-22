import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import AnswerModal from './AnswerModal.jsx';

export default function AddAnswer({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="add-answer d-flex align-content-start">
      <button
        className="helpfulness text-secondary text-size-90 bg-transparent border-0 shadow-none text-decoration-underline ps-1"
        onClick={toggleModal}
      >
        Add Answer
      </button>
      {showModal && (
        <AnswerModal onSubmit={onClick} toggleModal={toggleModal} />
      )}
    </div>
  );
}

AddAnswer.propTypes = {
  onClick: PropTypes.func.isRequired,
};
