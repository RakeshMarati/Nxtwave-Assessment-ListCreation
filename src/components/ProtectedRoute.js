import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/notfound" />;
  }

  return <div>Protected Content</div>;
};

export default ProtectedRoute;