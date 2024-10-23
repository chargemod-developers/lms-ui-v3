import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import BootPage from "./pages/admin/BootPage";
import ActivationPage from "./pages/admin/ActivationPage";
import IntroPage from "./pages/admin/IntroPage";
import AccessCodePage from "./pages/admin/AccessCodePage";
import WifiCheckPage from "./pages/admin/WifiCheckPage";
import ConnectingChargePoint from "./pages/admin/ConnectingChargePoint";
import HomePage from "./pages/HomePage";
import Layout from "./components/general/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/boot" element={<BootPage />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<ActivationPage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="access" element={<AccessCodePage />} />
          <Route path="wifi-check" element={<WifiCheckPage />} />
          <Route path="connect-cp" element={<ConnectingChargePoint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
