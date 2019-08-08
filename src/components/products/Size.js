import React from 'react';

const Size = ({ sizes, value, onChange }) => {
  return (
    <div className="filter-sizes mb-4">
      <h3>Size</h3>
      {sizes.length > 0
        ? sizes.map(size => (
            <button
              key={size}
              onClick={e => onChange('size', size)}
              className={`btn btn-light mr-2 shadow-none ${
                size === value ? 'active' : null
              }`}
            >
              {size}
            </button>
          ))
        : 'loading...'}
    </div>
  );
};

export default Size;
