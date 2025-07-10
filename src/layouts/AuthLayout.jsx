import React from "react";
import NavBar from "../pages/shared/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
