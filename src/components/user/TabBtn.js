import React from 'react';

const TabBtn = ({ tabKey, text, active, onClick }) => {
  let handleClick = () => onClick(tabKey);
  return (
    <button
      type="button"
      className={`nav-link btn btn-link ${active === true ? 'active' : null}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default TabBtn;
