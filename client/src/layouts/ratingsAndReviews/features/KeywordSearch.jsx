// This is a low priority component
// Feel free to work on it if you have completed the rest of the layouts functionality
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <input
        type="text"
        placeholder="Search Reviews.."
        onChange={handleSearch}
      />
    </div>
  );
}

KeywordSearch.propTypes = {
  handleSearchFilter: PropTypes.func,
};
