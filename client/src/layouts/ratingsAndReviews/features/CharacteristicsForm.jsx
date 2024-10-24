import React from 'react';
import PropTypes from 'prop-types';

export default function CharacteristicsForm({
  name,
  charId,
  value,
  onChange,
  labels,
}) {
  const handleRadioChange = (event) => {
    const selectedValue = Number(event.target.value);
    onChange(charId, selectedValue);
  };

  return (
    <div>
      <p>
        <b>{name}</b>
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <label key={num}>
            <input
              type="radio"
              name={`characteristic-${charId}`}
              value={num}
              checked={value === num}
              onChange={handleRadioChange}
            />
            {` ${labels[num - 1]}`}
          </label>
        ))}
      </div>
    </div>
  );
}

CharacteristicsForm.propTypes = {
  name: PropTypes.string.isRequired,
  charId: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).required,
};
