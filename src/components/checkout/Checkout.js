import React, { useState } from 'react';
import Delivery from './Delivery';
import Confirmation from './Confirmation';
import Payment from './Payment';
import Finish from './Finish';
import StepsBar from './StepsBar';
import { Elements, StripeProvider } from 'react-stripe-elements';

const Checkout = () => {
  let [step, setStep] = useState(1);
  let [deliveryInfo, setDelivery] = useState(null);

  let nextStep = () => setStep(step < 4 ? step + 1 : step);
  let backStep = () => setStep(step > 1 ? step - 1 : step);

  let onDeliverySubmit = info => {
    setDelivery(info);
  };

  let currentComponent = null;
  switch (step) {
    case 1:
      currentComponent = (
        <Delivery
          onSubmit={onDeliverySubmit}
          nextStep={nextStep}
          backStep={backStep}
        />
      );
      break;
    case 2:
      currentComponent = (
        <Confirmation
          deliveryInfo={deliveryInfo}
          nextStep={nextStep}
          backStep={backStep}
        />
      );
      break;
    case 3:
      currentComponent = (
        <Elements>
          <Payment nextStep={nextStep} backStep={backStep} />
        </Elements>
      );
      break;
    case 4:
      currentComponent = <Finish />;
      break;
    default:
  }
  return (
    <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
      <div className="container">
        <div className="my-4 bg-white checkout-wrapper">
          <h3 className="font-weight-bold pt-5 px-5">Checkout</h3>
          <div className="checkout-steps mt-4 mb-5 px-5">
            <StepsBar step={step} />
          </div>
          <div className="checkout-current">{currentComponent}</div>
        </div>
      </div>
    </StripeProvider>
  );
};

export default Checkout;
