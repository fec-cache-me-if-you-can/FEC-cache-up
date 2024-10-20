import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CharacteristicsForm({ name, value, onChange, labels }) {
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
              name={name}
              value={num}
              checked={value === num}
              onChange={() => onChange(name, num)}
            />
            {num === 1 && ` ${labels[0]}`}
            {num === 2 && ` ${labels[1]}`}
            {num === 3 && ` ${labels[2]}`}
            {num === 4 && ` ${labels[3]}`}
            {num === 5 && ` ${labels[4]}`}
          </label>
        ))}
      </div>
    </div>
  );
}

CharacteristicsForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
