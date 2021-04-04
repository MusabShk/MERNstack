import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() && isAutheticated().user.role === 1 ? (  //isAuthenticated popultes multiple things in browser like _id, role 
          <Component {...props} />  //what "Component" we want to render will be decided in the routes  //where we want to redirect is mentioned in Routes.js
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

export default AdminRoute;
