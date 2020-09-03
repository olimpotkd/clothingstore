import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//to use local storage vvvv
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root', //starting where in the reducer
  storage,
  whitelist: ['cart'] //this is the reducers we want to store, not user because it's handled by firebase
}
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);