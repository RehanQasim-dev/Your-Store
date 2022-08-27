import { createSlice } from "@reduxjs/toolkit";

const initialState = { loaded: [], added: [] };
const reviewSlice = createSlice({
  name: "Review",
  initialState,
  reducers: {
    addReview(state, action) {
      return { ...state, added: [action.payload, ...state.added] };
    },
    loadInitials(state, action) {
      return { ...state, loaded: action.payload.reverse() };
    },
  },
});

export default reviewSlice;
export const reviewActions = reviewSlice.actions;
