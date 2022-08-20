import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      console.log("adding item to cart");
      const item = state[action.payload.id];
      console.log("id= ", action.payload.id);
      console.log("payload=", action.payload);
      if (item !== undefined) {
        console.log("item already axists");
        item.quantity += action.payload.quantity;
      } else {
        return { ...state, [action.payload.id]: action.payload };
      }
    },
    removeItemfromCart(state, action) {
      delete state[action.payload.id];
    },
    setInitials(state, action) {
      let temp = {};
      action.payload.forEach((item) => {
        temp = {
          ...temp,
          [item.id]: {
            id: item.id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          },
        };
      });
      return temp;
    },
  },
});
export const getCartItemsAmount = (cartItems) => {
  let accumulator = 0;
  for (let i in cartItems) {
    accumulator += cartItems[i].quantity;
  }
  return accumulator;
};
export default cartSlice;
export const cartActions = cartSlice.actions;
