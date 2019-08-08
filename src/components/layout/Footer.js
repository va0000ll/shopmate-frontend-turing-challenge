import React from 'react';
import instagram from '../../icons/icons-instagram-grey.png';
import twitter from '../../icons/icons-twitter-grey.png';
import facebook from '../../icons/icons-twitter-grey.png';
import pinterest from '../../icons/icons-pinterest-grey.png';
const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-categories d-inline-block mb-4">
            <div className="d-flex flex-row justify-content-between ">
              <a href="/">Women</a>
              <a href="/">Men</a>
              <a href="/">Kids</a>
              <a href="/">Brands</a>
            </div>
          </div>
          <div className="social-media mb-3">
            <a href="/">
              <img src={instagram} alt="" />
            </a>
            <a href="/">
              <img src={pinterest} alt="" />
            </a>
            <a href="/">
              <img src={twitter} alt="" />
            </a>
            <a href="/">
              <img src={facebook} alt="" />
            </a>
          </div>
          <ul>
            <li>©2019 shopmate Ltd</li>
            <li>
              <a href="/">Contact</a>
            </li>
            <li>
              <a href="/">Privacy policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
