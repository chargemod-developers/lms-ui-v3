import React, { createContext, useMemo, useState } from "react";

// Step 1: Create a single context
export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
  });

  // Step 3: Combine the states into a single value object and memoize it
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      user,
      setUser,
    }),
    [theme, user]
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
