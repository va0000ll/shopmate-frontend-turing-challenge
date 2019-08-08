import React from 'react';
import PropTypes from 'prop-types';

const CategoryHeader = ({ category }) => {
  return (
    <div className="modules-1 mb-4">
      <h1 className="mb-3">
        <span className="text-capitalize">{category}</span> wear
      </h1>
      <ul>
        <li className="list-group-item">
          <a href="/">Accessories</a>
        </li>
        <li className="list-group-item">
          <a href="/">Hoodies & Sweatshirts</a>
        </li>
        <li className="list-group-item">
          <a href="/">Leather Jackets</a>
        </li>
        <li className="list-group-item">
          <a href="/">Accessories</a>
        </li>
        <li className="list-group-item">
          <a href="/">Hoodies & Sweatshirts</a>
        </li>
        <li className="list-group-item">
          <a href="/">Leather Jackets</a>
        </li>
        <li className="list-group-item">
          <a href="/">Accessories</a>
        </li>
        <li className="list-group-item">
          <a href="/">Hoodies & Sweatshirts</a>
        </li>
        <li className="list-group-item">
          <a href="/">Leather Jackets</a>
        </li>
        <li className="list-group-item">
          <a href="/">Accessories</a>
        </li>
        <li className="list-group-item">
          <a href="/">Hoodies & Sweatshirts</a>
        </li>
        <li className="list-group-item">
          <a href="/">Leather Jackets</a>
        </li>
        <li className="list-group-item">
          <a href="/">Accessories</a>
        </li>
        <li className="list-group-item">
          <a href="/">Hoodies & Sweatshirts</a>
        </li>
        <li className="list-group-item">
          <a href="/">Leather Jackets</a>
        </li>
      </ul>
    </div>
  );
};

CategoryHeader.propTypes = {
  category: PropTypes.string.isRequired
};

export default CategoryHeader;
