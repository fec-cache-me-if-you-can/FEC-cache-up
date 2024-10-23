import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

export default function DropdownSelector({
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
    <div className="dropdown d-inline-block">
      <button
        className="btn btn-primary btn-lg dropdown-toggle square border-0"
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
                className="dropdown-item text-size-200 p-3"
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

DropdownSelector.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  selectedOption: PropTypes.any,
};
