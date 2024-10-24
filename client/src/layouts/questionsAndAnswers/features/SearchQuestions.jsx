import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icons.jsx';

export default function SearchQuestions({ update }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    query.length >= 3 ? update(query) : update('');
  }, [query, update]);

  const updateQuery = (e) => setQuery(e.target.value);
  const handleClearSearch = () => {
    if (query) setQuery('');
  };
  return (
    <div className="input-group question-search square me-3 my-3 d-flex align-items-center">
      <input
        type="search"
        placeholder="Search..."
        className="form-control border-0 fs-5 custom-search-input no-outline"
        value={query}
        aria-label="Search"
        id="search-input"
        onChange={updateQuery}
        style={{ boxShadow: 'none', outline: 'none' }}
      />
      <div
        style={{ cursor: query ? 'pointer' : 'default' }}
        className="icon-container p-3 pe-4"
        onClick={handleClearSearch}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleClearSearch();
          }
        }}
      >
        <Icon
          icon={`fa-regular ${query ? 'fa-xmark' : 'fa-search'}`}
          size="lg"
        />
      </div>
    </div>
  );
}

SearchQuestions.propTypes = { update: PropTypes.func.isRequired };
