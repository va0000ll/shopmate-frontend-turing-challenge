import React, { useState, useContext } from 'react';
import removeIcon from '../../icons/icons-close-small-red.png';
import Quantity from '../products/Quantity';
import CartContext from '../../context/cart/cartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  let { deleteItem, updateItem } = useContext(CartContext);
  let [loading, setLoading] = useState(false);
  let onCountChange = async (name, value) => {
    if (!value) {
      toast('Quantity cant be 0', { type: 'error' });
      return false;
    }
    setLoading(true);
    await updateItem(value, item.item_id);
    setLoading(false);
  };
  let removeItem = async e => {
    setLoading(true);
    await deleteItem(item.item_id);
    setLoading(false);
  };
  return (
    <tr>
      <td className="pl-0">
        <div className="d-flex flex-row cart-product-info align-items-center">
          <div>
            <img
              src={`https://backendapi.turing.com/images/products/${
                item.image
              }`}
              alt=""
              className="img-thumbnail mr-4 rounded-0 cart-product-img p-2"
            />
          </div>
          <div>
            <h3>{item.name}</h3>
            {/* <p className="text-black mb-1">{item.item_id}</p> */}
            <button
              disabled={loading}
              className="btn btn-link btn-sm text-muted text-decoration-none p-0"
              onClick={removeItem}
            >
              <img src={removeIcon} alt="" />
              Remove
            </button>
          </div>
        </div>
      </td>
      <td className="text-center text-grey">{item.attributes}</td>
      <td className="text-center">
        {loading ? (
          'loading ...'
        ) : (
          <Quantity value={item.quantity} onChange={onCountChange} />
        )}
      </td>
      <td className="font-weight-bold text-right pr-0">£{item.price}</td>
    </tr>
  );
};

export default CartItem;
