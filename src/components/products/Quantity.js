import React from 'react';

const Quantity = ({ value, onChange, showTitle }) => {
  value = +value;
  return (
    <div className="quantity-filter d-inline-block">
      {showTitle ? <h3>Quantity</h3> : null}
      <div className="input-group">
        <div className="input-group-prepend">
          <button
            className="btn btn-light pt-0"
            onClick={e => onChange('quantity', value > 0 ? value - 1 : 0)}
          >
            -
          </button>
        </div>
        <input
          type="text"
          className="form-control shadow-none"
          value={value}
          onChange={e => onChange('quantity', +e.target.value || 0)}
        />
        <div className="input-group-prepend">
          <button
            className="btn btn-light"
            onClick={e => onChange('quantity', value + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
