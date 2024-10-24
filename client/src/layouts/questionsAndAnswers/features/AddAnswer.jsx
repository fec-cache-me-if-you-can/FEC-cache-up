import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import AnswerModal from './AnswerModal.jsx';

export default function AddAnswer({ onClick, productName, questionBody }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="add-answer">
      <button
        className="text-secondary text-size-90 bg-transparent border-0 text-decoration-underline text-nowrap"
        onClick={toggleModal}
      >
        Add answer
      </button>
      {showModal && (
        <AnswerModal
          onSubmit={onClick}
          toggleModal={toggleModal}
          productName={productName}
          questionBody={questionBody}
        />
      )}
    </div>
  );
}

AddAnswer.propTypes = {
  onClick: PropTypes.func.isRequired,
};
