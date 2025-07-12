import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  return (
    <div>
      <Navbar />
      <Outlet />
      {isHome && <Footer />}
    </div>
  );
};

export default MainLayout;
