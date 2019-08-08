import {
  SIGN_IN,
  SIGN_OUT,
  LOADING,
  LOAD_USER,
  AUTH_FAIL,
  HIDE_LOADING,
  UPDATE_INFO_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  LOAD_ORDERS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_INFO_SUCCESS:
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case SIGN_IN:
      let { accessToken, ...user } = action.payload;
      localStorage.setItem('usertoken', accessToken);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user
      };
    case AUTH_FAIL:
    case SIGN_OUT:
      localStorage.removeItem('usertoken');
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case HIDE_LOADING:
      return {
        ...state,
        loading: false
      };
    case LOAD_ORDERS:
      return {
        ...state,
        userOrders: action.payload
      };
    default:
      return state;
  }
};
