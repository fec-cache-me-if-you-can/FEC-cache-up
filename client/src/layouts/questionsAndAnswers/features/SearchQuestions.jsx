import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icons.jsx';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);

  const updateQuery = ({ target: { value } }) => setQuery(value);

  const clearSearchAndFocusInput = () => {
    if (query) {
      setQuery('');
    }
    searchInputRef.current?.focus();
  };

  return (
    <div className="input-group border border-dark square m-3">
      <input
        type="search"
        placeholder="Search..."
        className="form-control border-0 py-2 fs-4 custom-search-input no-outline"
        value={query}
        aria-label="Search"
        id="search-input"
        onChange={updateQuery}
        ref={searchInputRef}
        style={{ boxShadow: 'none', outline: 'none' }}
      />
      <button
        className="search-icon input-group-text border-0 bg-body secondary-color cursor-pointer"
        onClick={clearSearchAndFocusInput}
      >
        <Icon
          icon={`fa-regular ${query ? 'fa-xmark' : 'fa-search'}`}
          size="lg"
          style={!query && { opacity: 0.7 }}
        />
      </button>
    </div>
  );
}

SearchBar.propTypes = {};
