import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getUserRole } from "./utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState([]);

  const fetchUserRole = async () => {
    const roles = await getUserRole();
    setUserRole(roles);
  };

  const resetRole = () => {
    fetchUserRole();
  };

  const clearRole = () => {
    setUserRole([]);
  }

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={{userRole, clearRole, resetRole}}>{children}</UserContext.Provider>
  );
};

UserContext.PropTypes = {
  children: PropTypes.node.isRequired,
};
