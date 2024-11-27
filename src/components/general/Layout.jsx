import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { GlobalContext } from "../../globalState/GlobalProvider";
import config from "../../config/config";

const Layout = () => {
  const { setWifiStatus, setWs, socketCheckStatus } = useContext(GlobalContext);

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
  }, [setWs, socketUrl]);

  useEffect(() => {
    if (socketCheckStatus) {
      socketConnection();
    }
    const cleanupWifi = wifiConnection(); // Monitor Wifi status

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
