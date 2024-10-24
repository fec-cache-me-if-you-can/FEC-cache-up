import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

export default function DropdownSelectorSecondary({
  options,
  placeholder = 'Select',
  isDisabled,
  onChange,
  selectedOption,
}) {
  const [localSelectedOption, setLocalSelectedOption] = useState(
    selectedOption || '',
  );

  useEffect(() => {
    setLocalSelectedOption(selectedOption || '');
  }, [selectedOption]);

  const handleSelectChange = (option) => {
    setLocalSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="dropdown-simple d-inline-block align-content-center align-items-center">
      <button
        className="d-flex btn dropdown-toggle text-decoration-underline square border-0 fw-bold text-center p-0 py-0 fs-5 align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={isDisabled || options.length === 0}
      >
        {localSelectedOption || placeholder}
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
                className="dropdown-item fw-light fs-6 p-3"
                type="button"
                onClick={() => handleSelectChange(option)}
              >
                {option}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

DropdownSelectorSecondary.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  selectedOption: PropTypes.any,
};
