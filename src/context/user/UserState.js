import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  SIGN_IN,
  SIGN_OUT,
  LOADING,
  AUTH_FAIL,
  LOAD_USER,
  HIDE_LOADING,
  UPDATE_INFO_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  LOAD_ORDERS
} from '../types';

let api = process.env.REACT_APP_API_URI;

let UserState = props => {
  let initialState = {
    user: null,
    loading: true,
    isAuthenticated: false,
    userOrders: []
  };
  let [state, dispatch] = useReducer(UserReducer, initialState);

  // Loading user
  let loadUser = async () => {
    setLoading();

    try {
      let res = await axios.get(`${api}customer`);

      dispatch({
        type: LOAD_USER,
        payload: res.data
      });
    } catch (err) {
      if (err.response) {
        dispatch({ type: AUTH_FAIL });
      } else {
        toast('Please connect to the internet', {
          type: 'error'
        });
      }
    }
  };

  // Loading user orders
  let loadOrders = async () => {
    try {
      let res = await axios.get(`${api}orders/inCustomer`);

      dispatch({
        type: LOAD_ORDERS,
        payload: res.data
      });
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

  // Update user info
  let updateInfo = async user => {
    setLoading();

    try {
      let res = await axios.put(`${api}customer`, user);

      dispatch({
        type: UPDATE_INFO_SUCCESS,
        payload: res.data
      });
      toast('Your Information has been successfully updated', {
        type: 'success'
      });
    } catch (err) {
      dispatch({ type: HIDE_LOADING });
      if (err.response) {
        toast(err.response.data.error.message, {
          type: 'error'
        });
      } else {
        toast('Please connect to the internet & try again', {
          type: 'error'
        });
      }
    }
  };

  // Update user address
  let updateAddress = async address => {
    setLoading();

    try {
      let res = await axios.put(`${api}customers/address`, address);

      dispatch({
        type: UPDATE_ADDRESS_SUCCESS,
        payload: res.data
      });
      toast('Your Address has been successfully updated', {
        type: 'success'
      });
    } catch (err) {
      dispatch({ type: HIDE_LOADING });
      if (err.response) {
        toast(err.response.data.error.message, {
          type: 'error'
        });
      } else {
        toast('Please connect to the internet & try again', {
          type: 'error'
        });
      }
    }
  };

  // User register
  let register = async user => {
    setLoading();
    try {
      let res = await axios.post(`${api}customers`, user);

      dispatch({
        type: SIGN_IN,
        payload: { ...res.data.customer, accessToken: res.data.accessToken }
      });
      toast('You have been successfuly registerd', {
        type: 'success'
      });
    } catch (err) {
      if (err.response) {
        dispatch({ type: AUTH_FAIL });
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

  // User Login
  let login = async user => {
    setLoading();
    try {
      let res = await axios.post(`${api}customers/login`, user);

      dispatch({
        type: SIGN_IN,
        payload: { ...res.data.customer, accessToken: res.data.accessToken }
      });
    } catch (err) {
      if (err.response) {
        dispatch({ type: AUTH_FAIL });
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

  let logout = () => dispatch({ type: SIGN_OUT });

  let setLoading = () => dispatch({ type: LOADING });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userOrders: state.userOrders,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        loadUser,
        register,
        login,
        logout,
        updateInfo,
        updateAddress,
        loadOrders
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
