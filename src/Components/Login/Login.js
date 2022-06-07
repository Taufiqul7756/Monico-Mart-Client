import { useContext, useState } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import {
  SignupHandler,
  signInHandler,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginForm,
} from "./LoginManager";

initializeLoginForm();

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const FbSignIn = () => {
    handleFbSignIn().then((res) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    });
  };

  const SignOut = () => {
    handleSignOut().then((res) => {
      setUser(res);
      setLoggedInUser(res);
    });
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      //console.log(isFormValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
      //console.log(isPasswordValid && isPasswordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      SignupHandler(user.name, user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }

    if (!newUser && user.email && user.password) {
      signInHandler(user.email, user.password).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
    }
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login" style={{ textAlign: "center" }}>
        {user.isSignedIn ? (
          <button onClick={SignOut}>Sign Out by using Google</button>
        ) : (
          <button
            onClick={googleSignIn}
            type="button"
            class="login-with-google-btn"
          >
            Sign in with Google
          </button>
        )}
        <br />
        <button
          type="button"
          class="login-with-facebook-btn"
          onClick={FbSignIn}
        >
          Sign in with facebook
        </button>
        {user.isSignedIn && (
          <div>
            <p>Welcome , {user.name}</p>
            <p>Your Email: {user.email} </p>
            <img src={user.photo} alt=""></img>
          </div>
        )}
        <h6>Or Register yourself</h6>
        {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser"> New User Sign up</label>
        <br />

        <form onSubmit={handleSubmit}>
          {newUser && (
            <input
              name="name"
              type="text"
              onBlur={handleBlur}
              placeholder="Your Name"
            />
          )}
          <br />
          <input
            type="text"
            name="email"
            onBlur={handleBlur}
            placeholder="your Email address"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onBlur={handleBlur}
            placeholder="Enter your password"
            required
          />{" "}
          <br />
          <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
        </form>

        {user.error && (
          <p style={{ color: "red" }}>
            {" "}
            This Email already in use. Please try another account !
          </p>
        )}

        {user.success && (
          <p style={{ color: "green" }}>
            {" "}
            User {newUser ? "created" : "Sign in"} Successfully
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
