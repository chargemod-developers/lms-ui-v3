import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="p-7 bg-mainBg w-screen h-screen">
      <Outlet />
    </div>
  );
};

export default Layout;
