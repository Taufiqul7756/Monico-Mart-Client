import "./App.css";
import Header from "./Components/Header/Header";
import { createContext, useState } from "react";
import NoMatch from "./Components/NoMatch/NoMatch";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
} from "react-router-dom";
import Shop from "./Components/Shop/Shop";

export const UserContext = createContext();

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route exact path="/">
            <Shop></Shop>
          </Route>
          {/* <Route path="*">
            <NoMatch></NoMatch>
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
