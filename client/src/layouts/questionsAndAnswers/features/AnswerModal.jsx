import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'react-bootstrap';
import PrimaryButton from '@/components/PrimaryButton.jsx';

export default function AnswerModal({
  onSubmit,
  toggleModal,
  productName,
  questionBody,
  showModal,
}) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  const [errors, setErrors] = useState({});

  const validateName = (v) => v.length > 0 && v.length <= 60;
  const validateBody = (v) => v.length > 0 && v.length <= 1000;
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhotos = (v) => v.length <= 5;

  const handleSubmit = () => {
    const newErrors = {};

    if (!validateName(name))
      newErrors.name = 'Name must be between 1 and 60 characters.';
    if (!validateEmail(email)) newErrors.email = 'Invalid email address.';
    if (!validateBody(body))
      newErrors.body = 'Answer must be between 1 and 1000 characters.';
    if (!validatePhotos(photos))
      newErrors.photos = 'You can upload up to 5 photos.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const submitObject = {
        name,
        body,
        email,
        photos,
      };
      onSubmit(submitObject)
        .then(() => {
          toggleModal();
          setName('');
          setEmail('');
          setBody('');
          setPhotos([]);
          setErrors({});
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={toggleModal}
      centered
      contentClassName="square px-5 py-4"
      size="lg"
    >
      <Modal.Header closeButton className="border-0 d-flex align-items-start">
        <Modal.Title className="mt-1 fw-medium">Submit Your Answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="fs-6 fw-light">
          <p>
            <strong>{productName}:</strong> {questionBody}
          </p>
          <Form>
            <Form.Group controlId="answerBody">
              <Form.Label>Your Answer *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                isInvalid={!!errors.body}
                placeholder="Enter your answer here"
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="answerName">
              <Form.Label>What is your nickname *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example: jack543!"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Text className="text-muted">
                For privacy reasons, do not use your full name or email address.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="answerEmail">
              <Form.Label>Your Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="Example: jack@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Text className="text-muted">
                For authentication reasons, you will not be emailed.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <PrimaryButton
          label="Submit Answer"
          onClick={handleSubmit}
          isDisabled={false}
          fullWidth={false}
        />
      </Modal.Footer>
    </Modal>
  );
}

AnswerModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
  questionBody: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
};
