import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Collections from "./components/Lists/Collections";
import CollectionDetail from "./components/DetailItem/CollectionDetail";
import ProductDetail from "./components/DetailItem/ProductDetail";
function App() {
  const idToken = useSelector((state) => state.Auth.idToken);
  const isLoggedIn = !!idToken;
  console.log(isLoggedIn);
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
