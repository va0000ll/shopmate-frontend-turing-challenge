import {
  CART_ADD,
  CART_LOAD,
  CART_UPDATE,
  CART_DELETE,
  SET_CART_ID,
  CART_SET_TOTAL,
  LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_CART_ID:
      localStorage.setItem('cart_id', action.payload);
      return {
        ...state,
        cart_id: action.payload
      };
    case CART_SET_TOTAL:
      return {
        ...state,
        total_amount: action.payload
      };
    case CART_LOAD:
    case CART_UPDATE:
    case CART_ADD:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case CART_DELETE:
      let { products } = state;
      for (let i in products) {
        if (products[i].item_id === action.payload) {
          products.splice(i, 1);
          break;
        }
      }
      return {
        ...state,
        products
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
