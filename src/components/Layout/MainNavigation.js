import { Link } from "react-router-dom";
import { authActions } from "../../store/Slices/AuthSlice";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";

const MainNavigation = () => {
  const idToken = useSelector((state) => state.Auth.idToken);
  const authDispatch = useDispatch();
  console.log("main nevigation");
  const logOutHandler = (event) => {
    authDispatch(authActions.setLogout());
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!!!idToken && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {!!idToken && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {!!idToken && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
