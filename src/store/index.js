import authSlice from "./Slices/AuthSlice";
import cartSlice from "./Slices/CartSlice";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: { Auth: authSlice.reducer, Cart: cartSlice.reducer },
  middleware: [thunk],
});
export default store;
