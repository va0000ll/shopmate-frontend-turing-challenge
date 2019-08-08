import React, { useEffect, useState, Fragment, useContext } from 'react';
import FormGroupInput from '../forms/FormGroupInput';
import UserContext from '../../context/user/userContext';
import Spinner from '../layout/Spinner';

const Delivery = ({ nextStep, backStep, onSubmit }) => {
  let { loading, user } = useContext(UserContext);
  let [delivery_price, setDelivery] = useState(0);
  let [addressValues, setAddress] = useState({
    fname: '',
    lname: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });
  let { fname, lname, address, city, state, zip_code } = addressValues;

  useEffect(() => {
    if (user) {
      setAddress({
        fname: user.name,
        lname: '',
        address: user.address_1 || '',
        city: user.city || '',
        state: user.region || '',
        zip_code: user.postal_code || ''
      });
    }
  }, [user]);

  let onChange = (name, value) =>
    setAddress({ ...addressValues, [name]: value });

  let submit = () => {
    onSubmit({ ...addressValues, delivery_price });
    nextStep();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="pb-5 pt-4 px-5">
        <div className="row">
          <FormGroupInput
            value={fname}
            name="fname"
            onChange={onChange}
            label="Firts name"
            required={true}
            klass="col-md-6"
          />
          <FormGroupInput
            value={lname}
            name="lname"
            onChange={onChange}
            label="Last name"
            required={true}
            klass="col-md-6"
          />
          <FormGroupInput
            value={address}
            name="address"
            onChange={onChange}
            label="Address"
            required={true}
            klass="col-md-6"
          />
          <FormGroupInput
            value={city}
            name="city"
            onChange={onChange}
            label="City"
            required={true}
            klass="col-md-6"
          />
          <FormGroupInput
            value={state}
            name="state"
            onChange={onChange}
            label="State"
            required={true}
            klass="col-md-6"
          />
          <FormGroupInput
            value={zip_code}
            name="zip_code"
            onChange={onChange}
            label="Zip Code"
            required={true}
            klass="col-md-6"
          />
          <div className="form-group col-12">
            <label htmlFor="" className="font-weight-bold">
              <span className="text-grey">Country:</span>{' '}
              <span>{user ? user.country : null}*</span>
            </label>
          </div>
          <div className="form-group col-12">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="billing-check"
                disabled
                checked
              />
              <label className="custom-control-label" htmlFor="billing-check">
                My billing information is the same as my delivery information
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="border-top mt-4 pb-3 border-grey" />
          </div>
          <div className="col-12">
            <h2>Delivery Options</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="standard-shipping"
                    name="shipping-options"
                    value="0"
                    checked={delivery_price === 0}
                    onChange={e => setDelivery(0)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="standard-shipping"
                  >
                    <span className="font-weight-bold text-black">
                      Standard Shipping:
                    </span>{' '}
                    <small className="text-grey">
                      (free, 2-3 business days)
                    </small>
                  </label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="custom-control custom-radio">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="express-shipping"
                    name="shipping-options"
                    value="28"
                    checked={delivery_price === 28}
                    onChange={e => setDelivery(28)}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="express-shipping"
                  >
                    <span className="font-weight-bold text-black">
                      Express shipping:
                    </span>{' '}
                    <small className="text-grey">
                      (£28, 1-2 business days)
                    </small>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-footer d-flex flex-row justify-content-between px-5 py-4 bg-lightgrey">
        <button
          type="button"
          className="btn bg-light text-main bg-white"
          data-dismiss="modal"
          onClick={backStep}
        >
          Back
        </button>

        <button type="button" className="btn btn-primary" onClick={submit}>
          Next Step
        </button>
      </div>
    </Fragment>
  );
};

export default Delivery;
