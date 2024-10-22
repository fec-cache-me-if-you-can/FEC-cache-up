import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton.jsx';

const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};
export default function QuestionModal({ onSubmit, toggleModal }) {
  const [formData, setFormData] = useState({
    name: '',
    body: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData)
      .then(() => toggleModal())
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="answer-modal-title">
      <div>
        <label htmlFor="name" style={srOnly}>
          Name
        </label>
        <input
          type="text"
          className="form-control mb-4 square fs-5"
          id="name"
          placeholder="Name"
          onChange={handleChange}
          required
          name="name"
          aria-required="true"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" style={srOnly}>
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control my-4 square fs-5"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          required
          aria-required="true"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="body" style={srOnly}>
          Question
        </label>
        <textarea
          className="form-control mb-4 square fs-5"
          id="body"
          name="body"
          onChange={handleChange}
          rows="5"
          placeholder="Question"
          required
          aria-required="true"
          autoComplete="off"
        ></textarea>
      </div>

      <PrimaryButton
        label="Add Question"
        extraStyles="my-3"
        type="submit"
        aria-label="Add your question"
      />
    </form>
  );
}

QuestionModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
