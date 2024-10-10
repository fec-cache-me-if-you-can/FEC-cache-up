import React from 'react';
import { useState } from 'react';

export default function DropdownSelector({ options, defaultText, isDisabled, onChange }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <select value={selectedOption} onChange={handleSelectChange} disabled={isDisabled || options.length === 0}>
      <option value="">{defaultText || "Select Size"}</option>
      {options.length === 0 ? (
        <option value="">OUT OF STOCK</option>
      ) : (
        options.map((option) => (
          <option key={option.size} value={option.size}>
            {option.size}
          </option>
        ))
      )}
    </select>
  );
}
