import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import directorySlice from "./directory/directorySlice";
import shopSlice from "./shop/shopSlice";
import userSlice from "./user/userSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    directory: directorySlice,
    shop: shopSlice,
    user: userSlice,
  },
});
