import { createSlice } from "@reduxjs/toolkit";

const initialState = { navToOrder: false, search: "" };
const uiSlice = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    setNavigation(state, action) {
      state.navToOrder = !state.navToOrder;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});
export default uiSlice;
export const uiActions = uiSlice.actions;
