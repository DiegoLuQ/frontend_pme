import React from "react";
import { Outlet } from "react-router-dom";
import MenuGestion from "../moleculas/MenuGestion/MenuGestion";

const Gestion = () => {
  return (
    <div className="text-center h-[90vh] m-auto">
      <MenuGestion />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Gestion;
