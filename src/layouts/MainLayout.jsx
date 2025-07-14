import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/shared/NavBar/NavBar";
import Footer from "../pages/shared/Footer/Footer";
import DynamicTitle from "../components/DynamicTitle";

const MainLayout = () => {
  return (
    <>
      <DynamicTitle />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
