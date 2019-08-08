import React from 'react';
import icon from '../../icons/spinner.gif';

let Spinner = () => {
  return (
    <div className="text-center py-3">
      <img src={icon} alt="" />
    </div>
  );
};

export default Spinner;
