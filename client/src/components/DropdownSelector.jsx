import React, { useState, useEffect, useRef } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [options]);

  useEffect(() => {
    setLocalSelectedOption(selectedOption || '');
  }, [selectedOption]);

  const handleSelectChange = (option) => {
    setLocalSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const toggleDropdown = () => {
    if (!isDisabled && options.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="dropdown w-100">
      <button
        className="btn btn-primary btn-lg dropdown-toggle square border-0 w-100"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        disabled={isDisabled || options.length === 0}
      >
        {localSelectedOption || placeholder}
      </button>
      <div
        className="dropdown-drawer-container"
        style={{ height: isOpen ? menuHeight : 0 }}
      >
        <ul
          ref={menuRef}
          className={`dropdown-menu square w-100 my-0 py-0 ${isOpen ? 'show' : ''}`}
        >
          {options.length === 0 ? (
            <li>
              <span className="dropdown-item disabled">OUT OF STOCK</span>
            </li>
          ) : (
            options.map((option, index) => (
              <li key={index}>
                <button
                  className="dropdown-item p-3"
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
