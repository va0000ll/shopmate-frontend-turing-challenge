import React, { useState, Fragment, useContext } from 'react';
import visaIcon from '../../icons/logos-visa.png';
import masterIcon from '../../icons/logos-mastercard.png';
import paypalIcon from '../../icons/logos-PayPal.png';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe
} from 'react-stripe-elements';
import { toast } from 'react-toastify';
import Spinner from '../layout/Spinner';
import CartContext from '../../context/cart/cartContext';
import axios from 'axios';

const Payment = ({ stripe, backStep, nextStep }) => {
  let { cart_id, total_amount } = useContext(CartContext);

  let [loading, setLoading] = useState(false);
  let [paymentVia, setPaymentVia] = useState('card');
  let [holderName, setHolderName] = useState('');

  let notAvailable = () => {
    toast('This option is not available right now', { type: 'info' });
  };

  let submit = async e => {
    setLoading(true);
    try {
      let stripRes = await stripe.createToken({ name: holderName });
      if (stripRes.error) {
        throw stripRes;
      } else if (!stripRes.token) {
        throw { error: { message: 'Unknown error!!' } };
      }

      toast('Please wait while we proccess your order', { type: 'info' });

      let response = await axios.post(
        `${process.env.REACT_APP_API_URI}orders`,
        {
          cart_id,
          shipping_id: 1,
          tax_id: 1
        }
      );
      let { orderId } = response.data;
      await axios.post(`${process.env.REACT_APP_API_URI}stripe/charge`, {
        stripeToken: stripRes.token.id,
        order_id: parseInt(orderId),
        description: 'Test order',
        amount: parseInt(total_amount),
        currency: 'GBP'
      });

      setLoading(false);
      nextStep();
    } catch (error) {
      setLoading(false);
      let msg = 'No internet connection';
      if (error.response) {
        msg = error.response.data.error.message;
      } else if (error.error) {
        msg = error.error.message;
      }
      toast(msg, { type: 'error' });
    }
  };

  return (
    <Fragment>
      <div className="checkout-payments pb-5 pt-4 px-5">
        <div className="row mb-4">
          <div className="col-md-6">
            <label
              htmlFor="via-paypal"
              className={`d-block payment-field py-5 text-center${
                paymentVia === 'card' ? ' selected' : ''
              }`}
            >
              <div className="custom-control custom-radio">
                <div className="payments-icon">
                  <img src={visaIcon} alt="" className="mr-3" />
                  <img src={masterIcon} alt="" />
                </div>
                <input
                  type="radio"
                  className="custom-control-input"
                  id="via-paypal"
                  name="payment-options"
                  value="card"
                  checked={paymentVia === 'card'}
                  onChange={e => setPaymentVia(e.target.value)}
                />
                <div className="custom-control-label font-weight-bold mt-3 d-inline-block">
                  <div className="payment-text">
                    Pay £340.00 with credit card
                  </div>
                </div>
              </div>
            </label>
          </div>
          <div className="col-md-6">
            <label
              htmlFor="via-credit"
              className={`payment-field d-block py-5 text-center${
                paymentVia === 'paypal' ? ' selected' : ''
              }`}
              onClick={notAvailable}
            >
              <div className="custom-control custom-radio">
                <div className="payments-icon">
                  <img src={paypalIcon} alt="" />
                </div>
                <input
                  disabled
                  type="radio"
                  className="custom-control-input"
                  id="via-credit"
                  name="payment-options"
                  value="paypal"
                  checked={paymentVia === 'paypal'}
                  onChange={e => setPaymentVia(e.target.value)}
                />
                <div className="custom-control-label font-weight-bold mt-3 d-inline-block">
                  <div className="payment-text">Pay £340.00 with Paypal</div>
                </div>
              </div>
            </label>
          </div>
          <div className="col-12 mt-4">
            <div className="row align-items-end">
              <div className="col-md-6 form-group">
                <label htmlFor="card-holder-name">Cardholder's name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Ujean Pole"
                  value={holderName}
                  onChange={e => setHolderName(e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="card-holder-name">Card number</label>
                <CardNumberElement className="form-control form-control-lg" />
              </div>
              <div className="col-md-3 form-group">
                <label htmlFor="card-holder-name">Valid thru</label>
                <CardExpiryElement className="form-control form-control-lg" />
              </div>
              <div className="col-md-3 form-group">
                <label htmlFor="card-holder-name">CVV / CVC *</label>
                <CardCvcElement className="form-control form-control-lg" />
              </div>
              <div className="col-md-6 form-group">
                <small className="text-muted">
                  * CVV or CVC is the card security code, unique three digits
                  number on the back of your card separate from its number.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-footer">
        {loading ? (
          <Spinner />
        ) : (
          <div className="d-flex flex-row justify-content-between px-5 py-4 bg-lightgrey">
            <button
              type="button"
              className="btn bg-light text-main bg-white"
              data-dismiss="modal"
              onClick={backStep}
            >
              Back
            </button>

            <button type="button" className="btn btn-primary" onClick={submit}>
              Pay
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default injectStripe(Payment);
