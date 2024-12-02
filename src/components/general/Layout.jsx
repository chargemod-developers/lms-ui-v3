import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { GlobalContext } from "../../globalState/GlobalProvider";
import config from "../../config/config";
import axios from "axios";

const { serverUrl } = config;

const Layout = () => {
  const { setWifiStatus, setWs, ws, setDeviceStatus, handleGunData, handleMeterValues } =
    useContext(GlobalContext);

  const socketUrl = config.socketUrl;
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 3;
  const socketRef = useRef(null); // Use useRef to track WebSocket instance

  const wifiConnection = useCallback(() => {
    console.log("wifiConnection");
    if (navigator.onLine) {
      setWifiStatus("CONNECTED");
    }

    // Listen to the online status
    const handleStatusChange = () => {
      setWifiStatus(navigator.onLine ? "CONNECTED" : "DISCONNECTED");
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [setWifiStatus]);

  const socketConnection = useCallback(() => {
    if (socketRef.current) return; // Prevent multiple connections

    // Create WebSocket connection.
    const socket = new WebSocket(`${socketUrl}/live-data`);
    socketRef.current = socket;
    setWs(socket);

    socket.onopen = (event) => {
      // console.log(event);
      console.log("WebSocket connected");
      // setDeviceStatus("CONNECTED");
      reconnectAttemptsRef.current = 0;
    };

    socket.onerror = (error) => {
      console.log("WebSocket error");
      console.error(error);
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      console.log("Received");
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === "StatusNotification") {
        const statusData = data.data;
        handleGunData(statusData);
      } else if (data.type === "MeterValues") {
        const meterData = data.data;
        handleMeterValues(meterData);
      }
    };

    socket.onclose = (event) => {
      console.log("WebSocket disconnected");
      socketRef.current = null; // Reset the ref on close
      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        reconnectAttemptsRef.current += 1;
        console.log(`Reconnection attempt ${reconnectAttemptsRef.current}`);
        setTimeout(() => {
          socketConnection();
        }, 3000); // Attempt to reconnect after 3 seconds
      } else {
        console.log("Max reconnection attempts reached");
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        console.log("WebSocket disconnected");
      }
    };
  }, [socketUrl]);

  const deviceStatusPolling = () => {
    console.log("Polling for device Out");
    // Function to fetch device status
    const fetchDeviceStatus = () => {
      console.log("Polling for device status In");
      axios
        .get(`${serverUrl}/get-connection-status`)
        .then((res) => {
          const { isDeviceConnected } = res.data;
          console.log("Device status", isDeviceConnected);
          setDeviceStatus((prevStatus) => {
            if (prevStatus !== isDeviceConnected) {
              return isDeviceConnected;
            }
            return prevStatus;
          });
        })
        .catch((err) => {
          console.log("Error in fetching device status");
          console.log(err);
        });
    };
    // Run once immediately
    fetchDeviceStatus();
    // Set interval to run every 30 seconds
    const intervalId = setInterval(fetchDeviceStatus, 30000);
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    if (ws === null) {
      socketConnection();
    }
    const cleanupWifi = wifiConnection(); // Monitor Wifi status
    deviceStatusPolling(); // Poll for device status

    return () => {
      cleanupWifi();
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [socketConnection, wifiConnection]);

  return (
    <div className="p-7 bg-mainBg w-screen h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
