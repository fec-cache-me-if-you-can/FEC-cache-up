import React, { useState } from 'react';
import PropTypes from 'prop-types';

import QuestionModal from './QuestionModal.jsx';

export default function AddQuestion({
  onSubmit,
  refreshQuestions,
  setQuestions,
  productName,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
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
      <QuestionModal
        productName={productName}
        refreshQuestions={refreshQuestions}
        setQuestions={setQuestions}
        onSubmit={onSubmit}
        toggleModal={toggleModal}
        showModal={showModal}
      />
    </div>
  );
}

AddQuestion.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  refreshQuestions: PropTypes.func.isRequired,
  setQuestions: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};
