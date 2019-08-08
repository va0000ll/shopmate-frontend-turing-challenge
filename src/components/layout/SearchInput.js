import React from 'react';
import searchIcon from '../../icons/icons-search-white.png';
import closeIcon from '../../icons/icons-close-small-white.png';
const SearchInput = () => {
  return (
    <form action="/" className="search-input">
      <div className="input-group">
        <div className="input-group-prepend search-icon">
          <button className="input-group-text" type="submit">
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search anything"
          className="form-control"
        />
        <div className="input-group-prepend close-icon">
          <button className="input-group-text" type="button">
            <img src={closeIcon} alt="" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
