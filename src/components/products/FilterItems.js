import React, { useState } from 'react';
import closeBlack from '../../icons/icons-close-small-black.png';
import closeRed from '../../icons/icons-close-small-red.png';
import Color from './Color';
import Size from './Size';
import Range from './Range';
import Brands from './Brands';

const FilterItems = () => {
  let [itemAttr, setItemAttr] = useState({
    colors: [],
    sizes: []
  });
  let [attributes, setAttributes] = useState({
    quantity: 1,
    color: null,
    size: null
  });

  let { quantity, color, size } = attributes;
  let { colors, sizes } = itemAttr;

  // Handle filtering changes
  let onAttributeChange = (name, value) =>
    setAttributes({ ...attributes, [name]: value });

  return (
    <div className="card filter-items bg-transparent">
      <div className="card-body p-0">
        <div className="filter-head p-3 border-bottom">
          <h2>Filter 466 items</h2>
          <ul className="">
            <li className="d-block">
              <img src={closeBlack} alt="" />
              <span>Gender: </span>
              Women
            </li>
            <li className="d-block">
              <img src={closeBlack} alt="" />
              <span>Category: </span>
              Dresses
            </li>
          </ul>
        </div>
        <div className="filter-content bg-white p-3 pt-4 border-bottom">
          <Color colors={colors} />
          <Size sizes={sizes} />
          <Range />
          <Brands />
        </div>
        <div className="filter-footer text-center p-3">
          <button className="btn btn-primary">Apply</button>
          <button className="btn btn-light border-0 bg-transparent text-primary shadow-none">
            <img src={closeRed} alt="" /> Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItems;
