import { createSlice } from "@reduxjs/toolkit";

const initialState = { navToOrder: false };
const uiSlice = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    setNavigation(state, action) {
      state.navToOrder = !state.navToOrder;
    },
  },
});
export default uiSlice;
export const uiActions = uiSlice.actions;
