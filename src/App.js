import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./Components/Review/Review";
import NoMatch from "./Components/NoMatch/NoMatch";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Shipment from "./Components/Shipment/Shipment";
import { createContext } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h3>email: {loggedInUser.email}</h3> */}
      <Router>
        <Header signOut={loggedInUser}></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile user={loggedInUser} />
          </PrivateRoute>

          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
