// This is a low priority component
// Feel free to work on it if you have completed the rest of the layouts functionality
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icons.jsx';

export default function KeywordSearch({ handleSearchFilter }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    if (search) setSearch('');
  };

  useEffect(() => {
    handleSearchFilter(search);
  }, [search, handleSearchFilter]);

  return (
    <div className="input-group question-search square me-3 my-3 d-flex align-items-center">
      <input
        type="search"
        placeholder="Search..."
        className="form-control border-0 fs-5 custom-search-input no-outline"
        value={search}
        aria-label="Search"
        id="search-input"
        onChange={handleSearch}
        style={{ boxShadow: 'none', outline: 'none' }}
      />
      <div
        className="icon-container p-3 pe-4"
        onClick={handleClearSearch}
        style={{ cursor: search ? 'pointer' : 'default' }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleClearSearch();
          }
        }}
      >
        <Icon
          icon={`fa-regular ${search ? 'fa-xmark' : 'fa-search'}`}
          size="lg"
        />
      </div>
    </div>
  );
}

KeywordSearch.propTypes = {
  handleSearchFilter: PropTypes.func,
};
