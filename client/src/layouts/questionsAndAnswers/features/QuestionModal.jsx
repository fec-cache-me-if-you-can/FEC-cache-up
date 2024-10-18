import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function QuestionModal({ onSubmit, toggleModal }) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');

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
    const submitObject = { name: name, body: body, email: email };
    onSubmit(submitObject)
      .then(() => toggleModal())
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="modal "
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
            <h5 className="modal-title">Add Question</h5>
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
                <input
                  type="text"
                  className="form-control m-2"
                  id="email"
                  placeholder="Email"
                  onChange={changeEmail}
                />
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
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={toggleModal}
            >
              Close
            </button>
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
  onSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
