import React, { createContext, useMemo, useState } from "react";

// Step 1: Create a single context
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [wifiStatus, setWifiStatus] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const [ws, setWs] = useState(null);
  const [socketCheckStatus, setSocketCheckStatus] = useState(false);

  // Step 3: Combine the states into a single value object and memoize it
  const contextValue = useMemo(
    () => ({
      wifiStatus,
      setWifiStatus,
      deviceStatus,
      setDeviceStatus,
      ws,
      setWs,
      socketCheckStatus,
      setSocketCheckStatus,
    }),
    [
      wifiStatus,
      setWifiStatus,
      deviceStatus,
      setDeviceStatus,
      ws,
      setWs,
      socketCheckStatus,
      setSocketCheckStatus,
    ]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
