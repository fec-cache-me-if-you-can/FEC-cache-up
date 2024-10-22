import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton.jsx';
import QuestionModal from './QuestionModal.jsx';
import { Modal } from 'react-bootstrap';

export default function AddQuestion({ onClick }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={toggleModal}
        centered
        contentClassName="square px-5 py-4"
        size="lg"
      >
        <Modal.Header closeButton className="border-0 d-flex align-items-start">
          <Modal.Title className="mt-1 fw-medium">ADD QUESTION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionModal onSubmit={onClick} toggleModal={toggleModal} />
        </Modal.Body>
      </Modal>
      <PrimaryButton
        className="add-question btn btn-primary square btn-lg ms-3"
        onClick={toggleModal}
        plus={true}
        label="Add a Question"
      />
    </div>
  );
}

AddQuestion.propTypes = {
  onClick: PropTypes.func.isRequired,
};
