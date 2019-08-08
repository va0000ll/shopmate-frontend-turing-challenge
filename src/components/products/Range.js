import React, { useState } from 'react';
import InputRange from 'react-input-range';

const Range = () => {
  let max_value = 28;
  let [value, setValue] = useState({ min: 0, max: max_value });

  return (
    <div>
      <h3>Price range</h3>
      <div className="range-filter-btn mb-5">
        <InputRange
          formatLabel={value => `£${value}`}
          maxValue={max_value}
          minValue={0}
          value={value}
          onChange={value => setValue(value)}
        />
      </div>
    </div>
  );
};

export default Range;
