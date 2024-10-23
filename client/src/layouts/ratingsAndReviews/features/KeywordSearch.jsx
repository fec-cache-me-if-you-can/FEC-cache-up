// This is a low priority component
// Feel free to work on it if you have completed the rest of the layouts functionality
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../components/icons.jsx';

export default function KeywordSearch({ handleSearchFilter }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    if (e.target.value < 3) {
      setSearch('');
    } else {
      setSearch(e.target.value);
    }
  };
  useEffect(() => {
    handleSearchFilter(search);
  }, [search, handleSearchFilter]);

  return (
    <div className="input-group question-search square m-3 ms-5">
      <input
         type="search"
         className="form-control border-0 py-2 fs-4 custom-search-input no-outline"
        placeholder="Search Reviews.."
         aria-label="Search"
        id="search-input"
        style={{ boxShadow: 'none', outline: 'none' }}
        onChange={handleSearch}
      />
       <Icon
        icon={`fa-regular ${search ? 'fa-xmark' : 'fa-search'}`}
        size="lg"
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          opacity: !search ? 0.7 : 1,
        }}
      />
    </div>
  );
}

KeywordSearch.propTypes = {
  handleSearchFilter: PropTypes.func,
};
