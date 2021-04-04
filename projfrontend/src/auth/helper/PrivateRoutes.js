import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() ? (  
          <Component {...props} />  ////what "Component" we want to render will be decided in the routes **props=properties** //where we want to redirect is mentioned in Routes.js
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
