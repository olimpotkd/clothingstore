import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, removeItemFromCart } from "./helpers";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    hidden: true,
    cartItems: [],
  },
  reducers: {
    toggleHidden: (state) => {
      state.hidden = !state.hidden;
    },
    addItem: (state, action) => {
      state.cartItems = addItemToCart(state.cartItems, action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = removeItemFromCart(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
  },
});

export const { toggleHidden, addItem, removeItem, clearItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
