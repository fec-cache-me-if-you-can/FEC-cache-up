import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import QuestionModal from './QuestionModal.jsx';

export default function AddQuestion({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button
        className="add-question btn btn-primary square btn-lg m-3"
        onClick={toggleModal}
      >
        Add a Question
      </button>
      {showModal && (
        <QuestionModal onSubmit={onClick} toggleModal={toggleModal} />
      )}
    </div>
  );
}

AddQuestion.propTypes = {
  onClick: PropTypes.func.isRequired,
};
