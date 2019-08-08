import React from 'react';
import TopNavbar from './TopNavbar';
import Navbar from './Navbar';

const Header = ({ showCart }) => {
  return (
    <header id="header">
      <TopNavbar showCart={showCart} />
      <Navbar showCart={showCart} />
    </header>
  );
};

export default Header;
