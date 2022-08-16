import { configureStore, createSlice } from "@reduxjs/toolkit";
let initialState = "";
const getToken = localStorage.getItem("idToken");
if (getToken != "undefined") {
  initialState = getToken;
}
const remainingTime = (deadline) => {
  return deadline - Date.now();
};
let timer;
const authSlice = createSlice({
  name: "Auth",
  initialState: { idToken: initialState },
  reducers: {
    setLogin(state, action) {
      state.idToken = action.payload;
    },
    setLogout(state, action) {
      state.idToken = "";
      localStorage.removeItem("idToken");
      clearTimeout(timer);
    },
  },
});

export const setLoginn = (payload) => (dispatch) => {
  dispatch(authSlice.actions.setLogin(payload.idToken));
  localStorage.setItem("idToken", payload.idToken);
  localStorage.setItem("deadline", payload.deadline);
  const remaining = remainingTime(payload.deadline);
  timer = setTimeout(() => {
    dispatch(authSlice.actions.setLogout());
  }, remaining);
};

export default authSlice;
