import React from 'react';

const Color = ({ colors, onChange, value }) => {
  return (
    <div className="filter-colors mb-4">
      <h3>Color</h3>
      {colors.length > 0
        ? colors.map(color => (
            <div
              key={color}
              onClick={e => onChange('color', color)}
              className={`color-filter-btn d-inline-block mr-2 rounded-circle ${
                color === value ? 'active' : null
              }`}
            >
              <div
                className="rounded-circle"
                style={{ backgroundColor: `${color.toLowerCase()}` }}
              />
            </div>
          ))
        : 'loading...'}
    </div>
  );
};

export default Color;
