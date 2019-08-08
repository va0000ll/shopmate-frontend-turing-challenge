import React, { useContext, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import icon from '../../icons/icons-bag.png';
import whiteIcon from '../../icons/icons-bag-white.png';
import CartContext from '../../context/cart/cartContext';

const BagIcon = ({ nav, showCart }) => {
  let { loadProducts, products, loading, total_amount, cart_id } = useContext(
    CartContext
  );

  useEffect(() => {
    loadProducts(cart_id);
    //eslint-disable-next-line
  }, []);

  return (
    <div className={`bag-number bag-number-${nav} n d-inline`}>
      {loading ? (
        'laoding...'
      ) : (
        <Fragment>
          <button
            className="btn btn-light bag-icon d-inline mr-2"
            onClick={showCart}
          >
            <img src={nav === 'top' ? icon : whiteIcon} alt="" />
            <span className="badge">{products.length}</span>
          </button>
          {nav === 'top' && <span> Your bag: £ {total_amount}</span>}
        </Fragment>
      )}
    </div>
  );
};

BagIcon.defaultProps = {
  nav: 'top'
};

BagIcon.propTypes = {
  nav: PropTypes.string.isRequired
};

export default BagIcon;
