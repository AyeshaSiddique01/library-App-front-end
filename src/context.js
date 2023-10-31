import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getUserRole } from "./utils/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState([]);

  const fetchUserRole = () => {
    const roles = getUserRole();
    setUserRole(roles);
  };
  useEffect(() => {
    fetchUserRole();
  });

  return (
    <UserContext.Provider value={userRole}>{children}</UserContext.Provider>
  );
};

UserContext.PropTypes = {
  children: PropTypes.node.isRequired,
};
