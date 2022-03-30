import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import IndexLogin from "./views/Login/Index";

import { GoogleApiWrapper } from "google-maps-react";
const GOOGLE_MAPS_JS_API_KEY = "AIzaSyBw1NmF9WPHkP5KKUPlvtQwZN7aZABXdP8";

export class App extends React.Component {
  render() {
    if (window.location.pathname === "/") {
      if (localStorage.getItem("user") !== null) {
        return (
          <Redirect
            to={{
              // pathname: "/propiedades"
              pathname: "/home"
            }}
          />
        );
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        );
      }
    }
    
    return (
      <div id="app">
        {localStorage.getItem("user") !== null ? (
          <Router basename={process.env.REACT_APP_BASENAME || ""}>
            <div>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              })}
            </div>
          </Router>
        ) : (
          <Route path="/Login" component={IndexLogin} />
        )}
      </div>
    );
  }
}

App = GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_JS_API_KEY,
  libraries: ["places", "visualization"]
})(App);

export default App;
