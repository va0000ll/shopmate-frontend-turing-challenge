import React from 'react';

const StepsBar = ({ step }) => {
  let steps = ['Delivery', 'Confirmation', 'Payment', 'Finish'];
  return (
    <div className="steps-bar d-flex flex-row justify-content-between align-items-stretch">
      {steps.map((s, index) => (
        <div
          key={s}
          className={
            `steps-bar-item font-weight-bold pt-5 ` +
            (index + 1 <= step ? 'text-primary step-checked' : '')
          }
        >
          {s}
        </div>
      ))}
    </div>
  );
};

export default StepsBar;
