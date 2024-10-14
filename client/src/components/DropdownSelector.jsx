import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function DropdownSelector({
  options,
  placeholder = 'Select',
  isDisabled,
}) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (option) => {
    setSelectedOption(option);
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
          options.map((option) => (
            <li key={option.size}>
              <button
                className="dropdown-item text-size-200 p-3"
                type="button"
                onClick={() => handleSelectChange(option.size)}
              >
                {option.size}
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
