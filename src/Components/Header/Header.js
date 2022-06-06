import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ signOut }) => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      {/* <img src={logo} alt="" /> */}
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Review Cart</Link>
        <Link to="/profile">
          {!loggedInUser ? "Profile" : loggedInUser.name}
          {/* {loggedInUser && loggedInUser.name} {loggedInUser && "Profile"} */}
        </Link>
        <button
          onClick={() => {
            setloggedInUser({});
          }}
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default Header;
