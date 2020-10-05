import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import ProductsReducer from './Products';
import CartItemReducer from './CartItem';

export default combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  addToCart: CartItemReducer,
});