import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import BootPage from "./pages/admin/BootPage";
import ActivationPage from "./pages/admin/ActivationPage";
import IntroPage from "./pages/admin/IntroPage";
import AccessCodePage from "./pages/admin/AccessCodePage";
import WifiCheckPage from "./pages/admin/WifiCheckPage";
import ConnectingChargePoint from "./pages/admin/ChargePointConnectedPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/general/Layout";
import ChargePointConnectedPage from "./pages/admin/ChargePointConnectedPage";
import PluggedIn from "./pages/PluggedIn";
import PaymentPending from "./pages/PaymentPending";
import SomethingWrong from "./pages/SomethingWrong";
import MeterValues from "./pages/MeterValues";
import PaymentPage from "./pages/PaymentPage";
import ThankYou from "./pages/ThankYou";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="plugged-in/:connectorId" element={<PluggedIn />} />
          <Route path="payment-pending" element={<PaymentPending />} />
          <Route path="something-wrong" element={<SomethingWrong />} />
          <Route path="meter-values/:connectorId" element={<MeterValues />} />
          <Route path="pay/:duration/:consumed/:amount" element={<PaymentPage />} />
          <Route path="thank-you" element={<ThankYou />} />
        </Route>

        <Route path="/boot" element={<BootPage />} />
        <Route path="/admin" element={<Layout />}>
          <Route index element={<ActivationPage />} />
          <Route path="intro" element={<IntroPage />} />
          <Route path="access" element={<AccessCodePage />} />
          <Route path="wifi-check" element={<WifiCheckPage />} />
          <Route path="cp-connected" element={<ChargePointConnectedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
