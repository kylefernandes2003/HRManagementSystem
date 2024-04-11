// PrivateRoute.jsx
import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";

export const PrivateRoute = ({ path, element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
