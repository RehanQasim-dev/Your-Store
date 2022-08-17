import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [] };
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      let changed = false;
      for (let i of state.cartItems) {
        if (i.id === action.payload.id) {
          i.amount += action.payload.amount;
          changed = true;
        }
      }
      if (!changed) {
        state.cartItems.push(action.payload);
      }
    },
    removeItemfromCart(state, action) {
      state.cartItems.filter((item) => item.name != action.payload);
    },
    changeAmountOfItem(state, action) {},
  },
});
export const getCartItemsAmount = (cartItems) => {
  return cartItems.reduce(
    (totalamount, cartItem) => totalamount + cartItem.amount,
    0
  );
};
export default cartSlice;
export const cartActions = cartSlice.actions;
