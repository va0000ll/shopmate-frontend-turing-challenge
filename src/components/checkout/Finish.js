import React from 'react';
import rocketIcon from '../../icons/icons-rocket.png';
import { Link } from 'react-router-dom';

const Finish = () => {
  return (
    <div className="checkout-finished text-center pb-5 pt-4 px-5">
      <img src={rocketIcon} className="mb-3" alt="" />
      <h1 className="text-black mb-4">Success!</h1>
      <p className="m-0">Your items will be shipped shortly,</p>
      <p className="mb-4">you will get email with details</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Back to shop
      </Link>
    </div>
  );
};

export default Finish;
