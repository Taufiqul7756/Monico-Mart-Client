import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import logo from "../../images/logo1.png";
import "./Header.css";

const Header = ({ signOut }) => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext);

  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Review Cart</Link>
        {loggedInUser.isSignedIn && (
          <Link to="/profile">
            {loggedInUser.name}

            {/* {loggedInUser && loggedInUser.name} {loggedInUser && "Profile"} */}
          </Link>
        )}

        <Link to={!loggedInUser.isSignedIn && "/login"}>
          <span onClick={() => setloggedInUser({})}>
            {!loggedInUser.isSignedIn ? "SignIn" : "Sign Out"}
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
