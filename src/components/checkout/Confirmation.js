import React, { Fragment, useContext } from 'react';
import UserContext from '../../context/user/userContext';
import CartContext from '../../context/cart/cartContext';
import { Redirect } from 'react-router-dom';

const Confirmation = ({ nextStep, backStep, deliveryInfo }) => {
  let { user } = useContext(UserContext);
  let { products, total_amount } = useContext(CartContext);

  if (products.length <= 0) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="checkout-confirmation pb-5 pt-4 px-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Order summary</h2>
            <table className="table table-striped">
              <thead>
                <tr className="text-grey font-weight-bold">
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map(item => (
                  <tr key={item.item_id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td className="font-weight-bold text-main">
                      £{item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 pl-md-5">
            <h3 className="font-weight-bold">Delivery</h3>
            <h4 className="text-grey font-weight-bold my-4">Address</h4>
            <p className="m-0">
              {deliveryInfo.address}, {deliveryInfo.city},
            </p>
            <p className="m-0">
              {deliveryInfo.state}, {user.country}, {deliveryInfo.zip_code}
            </p>
            <h4 className="text-grey font-weight-bold my-4">
              Delivery options
            </h4>
            {deliveryInfo.delivery_price > 0 ? (
              <Fragment>
                Express shipping
                <div>({deliveryInfo.delivery_price}, 2-3 business days)</div>
              </Fragment>
            ) : (
              <Fragment>
                standard shipping
                <div>(free, 2-3 business days)</div>
              </Fragment>
            )}
          </div>
        </div>
        <div className="new-line" />
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg coupon-input"
                placeholder="Enter coupon code"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-around">
              <h3 className="w-100 text-center">
                <div className="text-grey">SubTotal</div>
                <div>
                  £
                  {parseFloat(total_amount) +
                    parseFloat(deliveryInfo.delivery_price)}
                </div>
              </h3>
              <h3 className="w-100 text-center">
                <div className="text-grey">Shipping</div>
                <div>Free</div>
              </h3>
              <h3 className="w-100 text-center">
                <div className="text-grey">Grandtotal</div>
                <div>
                  £
                  {parseFloat(total_amount) +
                    parseFloat(deliveryInfo.delivery_price)}
                </div>
              </h3>
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

        <button type="button" className="btn btn-primary" onClick={nextStep}>
          Next Step
        </button>
      </div>
    </Fragment>
  );
};

export default Confirmation;
