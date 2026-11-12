import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import useTheme from "../context/useTheme";
import { useEffect } from "react";

const AppLayout = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = `whole-container-${theme}`;
  }, [theme]);

  return (
    <main className="m-10">
      <Header /> <hr className="my-5"/>
      <div className="section-container">
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
