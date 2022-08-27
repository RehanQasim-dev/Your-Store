import { createSlice } from "@reduxjs/toolkit";
const initialState = !!localStorage.getItem("idToken");
const remainingTime = (deadline) => {
  return deadline - Date.now();
};
let timer;
const authSlice = createSlice({
  name: "Auth",
  initialState: { isLoggedIn: initialState },
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = true;
    },
    setLogout(state, action) {
      state.isLoggedIn = false;
      localStorage.removeItem("idToken");
      clearTimeout(timer);
    },
  },
});
export const authActions = authSlice.actions;
export const setLoginn = (payload) => (dispatch) => {
  dispatch(authActions.setLogin());
  localStorage.setItem("idToken", payload.idToken);
  localStorage.setItem("deadline", payload.deadline);
  const remaining = remainingTime(payload.deadline);
  timer = setTimeout(() => {
    dispatch(authActions.setLogout());
  }, remaining);
};

export default authSlice;
