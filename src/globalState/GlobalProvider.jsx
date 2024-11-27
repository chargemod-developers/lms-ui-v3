import React, { createContext, useMemo, useState } from "react";

// Step 1: Create a single context
export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [wifiStatus, setWifiStatus] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const [ws, setWs] = useState(null);
  const [gunData, setGunData] = useState({});
  const [meterValues, setMeterValues] = useState({});

  // Step 3: Combine the states into a single value object and memoize it

  const handleMeterValues = (data) => {
    const connectorId = data.connectorId;
    setMeterValues((prevData) => {
      const prevDataCopy = { ...prevData };
      prevDataCopy[connectorId] = data;
      return prevDataCopy;
    });
  };
  const handleGunData = (data) => {
    console.log(data);
    const connectorId = data.connectorId;
    const status = data.status;
    setGunData((prevData) => {
      const prevDataCopy = { ...prevData };
      prevDataCopy[connectorId] = data;
      return prevDataCopy;
    });
  };
  
  const contextValue = useMemo(
    () => ({
      wifiStatus,
      setWifiStatus,
      deviceStatus,
      setDeviceStatus,
      ws,
      setWs,
      gunData,
      meterValues,
      handleMeterValues,
      handleGunData,
    }),
    [
      wifiStatus,
      setWifiStatus,
      deviceStatus,
      setDeviceStatus,
      ws,
      setWs,
      gunData,
      meterValues,
      handleMeterValues,
      handleGunData,
    ]
  );



  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
