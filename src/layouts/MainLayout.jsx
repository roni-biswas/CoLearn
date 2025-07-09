import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/shared/NavBar/NavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
