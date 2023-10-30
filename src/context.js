import React, { createContext } from "react";
import PropTypes from "prop-types";

import { getUserRole } from "./utils/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userRole = getUserRole();

  return (
    <UserContext.Provider value={userRole}>
      {children}
    </UserContext.Provider>
  );
};

UserContext.PropTypes = {
  children: PropTypes.node.isRequired,
};