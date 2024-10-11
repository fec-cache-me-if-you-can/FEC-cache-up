import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function DropdownSelector({
  options,
  placeholder = 'Select',
  isDisabled,
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState('');
  const displayKey = options.length > 0 ? Object.keys(options[0])[0] : null;

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="dropdown d-inline-block">
      <button
        className="btn btn-primary btn-lg dropdown-toggle square border-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={isDisabled || options.length === 0}
      >
        {selectedOption || placeholder}
      </button>
      <ul className="dropdown-menu square w-100 my-0 py-0">
        {options.length === 0 ? (
          <li>
            <span className="dropdown-item disabled">OUT OF STOCK</span>
          </li>
        ) : (
          options.map((option, index) => (
            <li key={index}>
              <button
                className="dropdown-item text-size-200 p-3"
                type="button"
                onClick={() => handleSelectChange(option[displayKey])}
              >
                {option[displayKey]}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

DropdownSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
