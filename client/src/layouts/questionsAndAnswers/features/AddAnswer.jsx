import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import AnswerModal from './AnswerModal.jsx';

export default function AddAnswer({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal((val) => !val);
  }, []);

  return (
    <div className="add-answer d-flex align-content-start">
      <Modal
        show={showModal}
        onHide={toggleModal}
        centered
        contentClassName="square px-5 py-4"
        size="lg"
      >
        <Modal.Header closeButton className="border-0 d-flex align-items-start">
          <Modal.Title className="mt-1 fw-medium">ADD ANSWER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnswerModal onSubmit={onClick} toggleModal={toggleModal} />
        </Modal.Body>
      </Modal>
      <button
        className="helpfulness text-secondary text-size-90 bg-transparent border-0 shadow-none text-decoration-underline ps-1"
        onClick={toggleModal}
        aria-label="Add Answer"
      >
        Add Answer
      </button>
    </div>
  );
}

AddAnswer.propTypes = {
  onClick: PropTypes.func.isRequired,
};
