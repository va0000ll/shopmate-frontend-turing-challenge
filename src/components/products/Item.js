import React from 'react';
import heart from '../../icons/icons-heart-red.png';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-2 mb-3">
      <div className="card p-3 text-center">
        <img
          src={`https://backendapi.turing.com/images/products/${
            product.thumbnail
          }`}
          className="card-img-top"
          alt=""
        />
        <div className="card-body px-0">
          <div className="card-title">{product.name}</div>
          <div className="card-text">
            {+product.discounted_price > 0 ? (
              <div className="text-right">
                <div className="d-inline-block">
                  £ {product.discounted_price}
                </div>
                <div className="discounted-price float-left">
                  £ {product.price}
                </div>
              </div>
            ) : (
              `£ ${product.price}`
            )}
          </div>
        </div>
        <div className="card-overflow">
          <div className="card-overflow-content">
            <div className="card-title">{product.name}</div>
            <p className="card-text">
              £{' '}
              {+product.discounted_price > 0
                ? product.discounted_price
                : product.price}
            </p>
            <div className="mt-5 mb-2">
              <Link
                to={`/product/${product.product_id}`}
                className="btn btn-primary"
              >
                Quick View
              </Link>
            </div>
            <button className="btn btn-light shiw-list-add bg-transparent border-0 text-muted shadow-none">
              <img src={heart} className="ml-2" alt="" /> Add to Wish List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
