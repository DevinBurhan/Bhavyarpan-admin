import React from "react";
import propTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component, path }) => {
  const isLoggedIn = useSelector((state) => state.auth.login);
  return isLoggedIn ? (
    <Route component={component} path={path} />
  ) : (
    <Navigate to="/" />
  );
};

ProtectedRoute.propTypes = {
  component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
