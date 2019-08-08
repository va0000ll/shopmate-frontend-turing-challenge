import React, { useEffect, useState } from 'react';
// import BagIcon from './BagIcon';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = ({ showCart }) => {
  let [departments, setDepartments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(
          `${process.env.REACT_APP_API_URI}departments`
        );
        setDepartments(res.data);
      } catch (error) {
        let message = error.message;
        if (error.response) {
          message = error.response.data.error.message;
        }
        toast(message, { type: 'error' });
      }
    })();
    //eslint-disable-next-line
  }, []);

  let items = departments.map(item => (
    <li key={item.department_id} className="nav-item">
      <Link to={`/department/${item.department_id}`} className="nav-link">
        {item.name}
      </Link>
    </li>
  ));

  return (
    <nav className="main-navbar navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand mr-5">
          shopmate
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">{items}</ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <SearchInput />
            </li>
            {/* <li className="nav-item">
              <BagIcon showCart={showCart} nav="bottom" />
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
