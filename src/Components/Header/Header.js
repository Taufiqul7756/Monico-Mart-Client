import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // const [loggedInUser, setloggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      {/* <img src={logo} alt="" /> */}
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Review</Link>
        <Link to="/manage">Manage Inventory</Link>
        <Link to="/profile">Profile</Link>
        <button
        // onClick={() => {
        //   setloggedInUser({});
        // }}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Header;
