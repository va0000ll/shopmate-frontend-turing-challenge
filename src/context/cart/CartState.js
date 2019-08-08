import React, { useReducer } from 'react';
import CartContext from './cartContext';
import CartReducer from './cartReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  CART_ADD,
  CART_LOAD,
  CART_UPDATE,
  CART_DELETE,
  SET_CART_ID,
  CART_SET_TOTAL,
  LOADING
} from '../types';

let api = process.env.REACT_APP_API_URI;

let CartState = props => {
  let initialState = {
    products: null,
    cart_id: localStorage.getItem('cart_id'),
    loading: true,
    total_amount: 0
  };
  let [state, dispatch] = useReducer(CartReducer, initialState);

  // Loading cart products
  let loadProducts = async cart_id => {
    dispatch({ type: LOADING });

    try {
      if (!cart_id) {
        let res = await axios.get(`${api}shoppingcart/generateUniqueId`);
        cart_id = res.data.cart_id;
        dispatch({ type: SET_CART_ID, payload: cart_id });
      }

      let res = await axios.get(`${api}shoppingcart/${cart_id}`);
      dispatch({
        type: CART_LOAD,
        payload: res.data
      });
      getCartTotal(cart_id);
    } catch (err) {
      if (err.response) {
        toast(err.response.data.error.message, {
          type: 'error'
        });
      } else {
        toast('Please connect to the internet', {
          type: 'error'
        });
      }
    }
  };

  // Add item to cart
  let addItem = async item => {
    try {
      let res = await axios.post(`${api}shoppingcart/add/`, item);
      dispatch({ type: CART_ADD, payload: res.data });
      toast('Item has been added to your cart', { type: 'success' });
      getCartTotal(item.cart_id);
    } catch (err) {
      if (err.response) {
        toast(err.response.data.error.message, {
          type: 'error'
        });
      } else {
        toast('Please connect to the internet', {
          type: 'error'
        });
      }
    }
  };

  // Update cart item
  let updateItem = async (quantity, item_id, cart_id) => {
    try {
      let res = await axios.put(`${api}shoppingcart/update/${item_id}`, {
        quantity
      });
      dispatch({ type: CART_UPDATE, payload: res.data });
      getCartTotal(cart_id);
    } catch (err) {
      if (err.response) {
        toast(err.response.data.error.message, {
          type: 'error'
        });
      } else {
        toast('Please connect to the internet', {
          type: 'error'
        });
      }
    }
  };

  // Delete item from cart
  let deleteItem = async (item_id, cart_id) => {
    try {
      await axios.delete(`${api}shoppingcart/removeProduct/${item_id}`);
      dispatch({ type: CART_DELETE, payload: item_id });
      toast('Item has been deleted from cart', { type: 'success' });
      getCartTotal(cart_id);
    } catch (err) {
      if (err.response) {
        toast(err.response.data.error.message, {
          type: 'error'
        });
      } else {
        toast('Please connect to the internet', {
          type: 'error'
        });
      }
    }
  };

  // Get cart total
  let getCartTotal = async cart_id => {
    try {
      let res = await axios.get(`${api}shoppingcart/totalAmount/${cart_id}`);

      dispatch({
        type: CART_SET_TOTAL,
        payload: res.data.total_amount || 0
      });
    } catch (error) {
      toast('Opps! There is an error cant bring cart total amount', {
        type: 'error'
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        cart_id: state.cart_id,
        loading: state.loading,
        total_amount: state.total_amount,
        loadProducts,
        addItem,
        updateItem,
        deleteItem
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
