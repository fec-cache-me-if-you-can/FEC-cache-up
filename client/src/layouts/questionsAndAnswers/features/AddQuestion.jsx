import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import QuestionModal from './QuestionModal.jsx';

export default function AddQuestion({
  onClick,
  refreshQuestions,
  setQuestions,
  productName,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button
        className="btn btn-primary square ms-3 my-3 me-0 d-flex flex-nowrap text-nowrap"
        onClick={toggleModal}
        style={{ whiteSpace: 'nowrap' }}
      >
        Add a Question
      </button>
      {showModal && (
        <QuestionModal
          productName={productName}
          refreshQuestions={refreshQuestions}
          setQuestions={setQuestions}
          onSubmit={onClick}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}

AddQuestion.propTypes = {
  onClick: PropTypes.func.isRequired,
  refreshQuestions: PropTypes.func.isRequired,
  setQuestions: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};
