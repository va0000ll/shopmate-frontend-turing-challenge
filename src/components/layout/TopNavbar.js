import React from 'react';
import BagIcon from './BagIcon';
// import gbr from '../../icons/gbr.png';

import UserMenu from '../user/UserMenu';

const TopNavbar = ({ showCart }) => {
  return (
    <div className="top-navbar">
      <div className="container d-flex flex-row align-items-center justify-content-between">
        <div className="right-items">
          <UserMenu />
        </div>
        <div className="center-items d-md-block d-none">
          <a href="/">Daily Deals</a>
          <a href="/">Sell</a>
          <a href="/">Help & Conteact</a>
        </div>
        <div className="left-items">
          {/* <a href="/" className="mr-5">
            <img src={gbr} alt="" /> £ GBP
          </a> */}
          <BagIcon showCart={showCart} nav="top" />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
