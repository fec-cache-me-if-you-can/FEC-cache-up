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
    <button className="add-question btn btn-primary square btn-lg">
      Add a Question
      {showModal && (
        <QuestionModal onSubmit={onClick} toggleModal={toggleModal} />
      )}
    </button>
  );
}

AddQuestion.propTypes = {
  onClick: PropTypes.func.isRequired,
};
