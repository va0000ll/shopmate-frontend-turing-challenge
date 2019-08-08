import React from 'react';

const Brands = () => {
  let brands = [
    'brand 112 ',
    'brand 112',
    'brand 112',
    'brand 112',
    'brand 112',
    'brand 112'
  ];
  return (
    <div className="filter-brands mb-3">
      <h3>Brands</h3>
      {brands.map((b, index) => (
        <div className="custom-control custom-checkbox" key={index}>
          <input
            type="checkbox"
            className="custom-control-input"
            id={`brand-${index}`}
          />
          <label className="custom-control-label" htmlFor={`brand-${index}`}>
            {b}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Brands;
