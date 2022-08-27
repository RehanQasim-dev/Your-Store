import authSlice from "./Slices/AuthSlice";
import cartSlice from "./Slices/CartSlice";
import uiSlice from "./Slices/uiSlice";
import reviewSlice from "./Slices/ReviewSlice";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const store = configureStore({
  reducer: {
    Auth: authSlice.reducer,
    Cart: cartSlice.reducer,
    Ui: uiSlice.reducer,
    Review: reviewSlice.reducer,
  },
  middleware: [thunk],
});
export default store;
