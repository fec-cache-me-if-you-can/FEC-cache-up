import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function QuestionModal({
  productName,
  onSubmit,
  toggleModal,
  refreshQuestions,
  setQuestions,
  }) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');

  const [validName, setValidName] = useState(true);
  const [validBody, setValidBody] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const validateName = (v) => {
    return v.length && v.length <= 60;
  };

  const validateBody = (v) => {
    return v.length && v.length <= 1000;
  };

  const validateEmail = (v) => {
    return v.includes('.') && v.includes('@') && v.length >= 5;
  };

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeBody = (e) => {
    setBody(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    if (
      validateName(name) &&
      validateEmail(email) &&
      validateBody(body)
    ) {
      const submitObject = { name: name, body: body, email: email };

      onSubmit(submitObject)
        .then(() => toggleModal())
        .then(() => {
          refreshQuestions()
            .then((result) => setQuestions(result.data.results))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      setValidName(validateName(name));
      setValidEmail(validateEmail(email));
      setValidBody(validateBody(body));
    }
  };

  return (
    <div
      className="modal review-modal-overlay"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="false"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <div><h5 className="modal-title">Ask Your Question</h5></div>
              <div>about the {productName}</div>
            </div>
            <button
              type="button"
              className="close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control m-2"
                  id="name"
                  placeholder="Name"
                  onChange={changeName}
                />
                {!validName && (
                  <div className="modal-warning">input is not valid</div>
                )}
                <input
                  type="text"
                  className="form-control m-2"
                  id="email"
                  placeholder="Email"
                  onChange={changeEmail}
                />
                {!validEmail && (
                  <div className="modal-warning">input is not valid</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message-text" className="col-form-label">
                  Question
                </label>
                <textarea
                  className="form-control"
                  id="body"
                  onChange={changeBody}
                ></textarea>
                {!validBody && (
                  <div className="modal-warning">input is not valid</div>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QuestionModal.propTypes = {
  productName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  refreshQuestions: PropTypes.func.isRequired,
};
