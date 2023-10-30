import React from "react";

import Routing from "./Routes/Routing";
import { UserProvider } from "./context";

const App = () => (
  <UserProvider>
    <Routing />
  </UserProvider>
);

export default App;
