import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icons.jsx';

export default function SearchQuestions({ update }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    query.length >= 3 ? update(query) : update('');
  }, [query, update]);

  const updateQuery = (e) => setQuery(e.target.value);

  return (
    <div className="input-group question-search square m-3">
      <input
        type="search"
        placeholder="Search..."
        className="form-control border-0 py-2 fs-4 custom-search-input no-outline"
        value={query}
        aria-label="Search"
        id="search-input"
        onChange={updateQuery}
        style={{ boxShadow: 'none', outline: 'none' }}
      />
      <Icon
        icon={`fa-regular ${query ? 'fa-xmark' : 'fa-search'}`}
        size="lg"
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          opacity: !query ? 0.7 : 1,
        }}
      />
    </div>
  );
}

SearchQuestions.propTypes = { update: PropTypes.func.isRequired };
