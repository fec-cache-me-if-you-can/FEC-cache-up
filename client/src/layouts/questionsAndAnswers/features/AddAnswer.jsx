import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AnswerModal from './AnswerModal.jsx';

export default function AddAnswer({ onSubmit, productName, questionBody }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="add-answer">
      <button
        className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap"
        onClick={toggleModal}
      >
        Add answer
      </button>
      <AnswerModal
        onSubmit={onSubmit}
        toggleModal={toggleModal}
        productName={productName}
        questionBody={questionBody}
        showModal={showModal}
      />
    </div>
  );
}

AddAnswer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  questionBody: PropTypes.string.isRequired,
};
