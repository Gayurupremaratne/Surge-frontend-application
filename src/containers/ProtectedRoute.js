import React from "react";
import { Redirect, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    var decoded = jwt_decode(localStorage.getItem("token"));
    const isAuthenticated = false;
    if(decoded.type === "admin"){
        isAuthenticated = true;
    }
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
