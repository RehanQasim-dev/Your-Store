import authSlice from "./reducer/AuthReducer";
import {setLogin} from "./reducer/AuthReducer";
import { configureStore,applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
const store=configureStore({
    reducer:{Auth:authSlice.reducer},
    middleware:[thunk]
})
export default store

export const actions={...authSlice.actions}
// export setLogin