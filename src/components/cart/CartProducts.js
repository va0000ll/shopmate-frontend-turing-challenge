import React, { useContext } from 'react';
import closeIcon from '../../icons/icons-close-big-black.png';
import CartItem from './CartItem';
import CartContext from '../../context/cart/cartContext';
import UserContext from '../../context/user/userContext';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartProducts = withRouter(({ closeModal, history }) => {
  let { products } = useContext(CartContext);
  let { isAuthenticated } = useContext(UserContext);

  let onClose = () => {
    document.querySelector('.cart .modal').classList.remove('show');
    closeModal(false);
  };

  let navigateToCart = () => {
    if (!isAuthenticated) {
      toast('You should login first before make checkout', { type: 'info' });
    } else {
      history.push('/checkout');
      onClose();
    }
  };

  return (
    <div className="cart">
      <div className="modal fade d-block" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pl-0">
              <h5 className="modal-title font-weight-bold mt-4 pl-5">
                {products.length} Items In Your Cart
              </h5>
              <button
                type="button"
                className="close p-0"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <img src={closeIcon} alt="" />
              </button>
            </div>
            <div className="modal-body px-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-center">Size</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map(item => (
                      <CartItem item={item} key={item.item_id} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        You have no items in your cart
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer bg-lightgrey border-0 justify-content-between px-5 py-4">
              <button
                type="button"
                className="btn bg-light text-main bg-white"
                data-dismiss="modal"
                onClick={onClose}
              >
                Back to Shop
              </button>
              {/* <Link to="/checkout" className="btn btn-primary">
                Checkout
              </Link> */}
              <button onClick={navigateToCart} className="btn btn-primary">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartProducts;
