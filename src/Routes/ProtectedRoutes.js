import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { Typography } from "@mui/material";

import Navbar from "../Components/Common/Navbar";

const ProtectedRoute = ({ children, isProtected = true }) => {
  const ACCESS_TOKEN = localStorage.getItem("access_token");

  if (isProtected === false) {
    if (ACCESS_TOKEN) return <Navigate to="/" replace />;
    return <Typography minHeight="85vh">{children}</Typography>;
  }

  if (!ACCESS_TOKEN) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      <Typography minHeight="85vh">{children}</Typography>
    </>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  isProtected: PropTypes.bool,
};

export default ProtectedRoute;
