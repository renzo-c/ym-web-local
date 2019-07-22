import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ParkeoPage from "views/ParkeoPage/ParkeoPage.jsx";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import decode from "jwt-decode";
import Login from "views/AdminPage/Sections/Login/Login.jsx";

const client = new ApolloClient({
  uri: "https://vp-graphql-local.herokuapp.com/graphql"
});

var hist = createBrowserHistory();

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect exact to="/parkeo/admin-page/login" />
        );
      }}
    />
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/" name="LandingPage" component={LandingPage} />
        <Route exact path="/parkeo" name="ParkeoPage" component={ParkeoPage} />
        <Route
          exact
          path="/parkeo/admin-page/login"
          name="Login"
          component={Login}
        />
        {indexRoutes.map((prop, key) => {
          return (
            <PrivateRoute
              exact
              path={prop.path}
              key={key}
              component={prop.component}
            />
          );
        })}
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
