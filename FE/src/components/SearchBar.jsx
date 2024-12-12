import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Tìm kiếm bác sĩ..."
      value={value}
      onChange={onChange}
      style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
    />
  );
};

export default SearchBar;
