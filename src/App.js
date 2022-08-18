import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import useApiLite from "./hooks/useApiLite";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Collections from "./components/Lists/Collections";
import CollectionDetail from "./components/DetailItem/CollectionDetail";
import ProductDetail from "./components/DetailItem/ProductDetail";
import useApi from "./hooks/useApi";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { cartActions } from "./store/Slices/CartSlice";
const createCart = () => {
  return axios.post("http://localhost:8000/store/Carts/", {});
};
const getCartItems = () => {
  return axios.get(
    `http://localhost:8000/store/Carts/${localStorage.getItem("cartId")}/Items`
  );
};
let response;
function App() {
  const cartDispatch = useDispatch();
  response = useApi(createCart);
  const cartResponse = useApiLite(getCartItems);
  const cartIdExists = localStorage.getItem("cartId") != null;
  useEffect(() => {
    if (!cartIdExists && response.data.id) {
      localStorage.setItem("cartId", response.data.id);
    } else if (!cartIdExists && !response.data.id) {
      response.request();
    }
  }, [response.data.id]);
  useEffect(() => {
    const test2 = async () => {
      if (cartIdExists) {
        await cartResponse.request();
      }
      cartDispatch(cartActions.setInitials(cartResponse.data.current.results));
    };
    test2();
  }, []);
  const idToken = useSelector((state) => state.Auth.idToken);
  const isLoggedIn = !!idToken;
  return (
    <>
      <Navbar />
      <Routes>
        {<Route element={<HomePage />} path="/" />}
        {isLoggedIn && (
          <>
            <Route element={<UserProfile />} path="/profile" />
            <Route element={<Collections />} path="/collections" />
            <Route element={<CollectionDetail />} path="/collections/:id" />
            <Route element={<ProductDetail />} path="/products/:id" />
            <Route
              element={<Navigate to="/collections" replace />}
              path="/auth"
            />
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route element={<AuthPage />} path="/auth" />
            <Route element={<Navigate to="/auth" replace />} path="*" />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
