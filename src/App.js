import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import useApiLite from "./hooks/useApiLite";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar/Navbar";
import ProductDetail from "./components/DetailItem/ProductDetail";
import useApi from "./hooks/useApi";
import axios from "axios";
import { useEffect } from "react";
import { cartActions } from "./store/Slices/CartSlice";
import PlaceOrder from "./pages/PlaceOrder";
import { useMatch } from "react-router-dom";
import CollectionProducts from "./pages/CollectionProducts";
import ProductDetailPage from "./pages/ProductDetailPage";
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
  const match = useMatch("/collections/:id");
  const navToOrder = useSelector((state) => state.Ui.navToOrder);
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
    // <div className="text-red-400 sm:text-black lg:text-purple-600">heloo</div>
    <div className="bg-zinc-300">
      <Navbar />
      <Routes>
        <Route element={<CollectionProducts />} path="/collections/:id" />
        <Route element={<ProductDetailPage />} path="/products/:id" />
        {isLoggedIn && (
          <>
            <Route element={<PlaceOrder />} path="/placeorder" />
            <Route element={<UserProfile />} path="/profile" />
            <Route
              element={
                <Navigate
                  to={navToOrder ? "/placeorder" : "/collections/1"}
                  replace
                />
              }
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
    </div>
  );
}

export default App;
