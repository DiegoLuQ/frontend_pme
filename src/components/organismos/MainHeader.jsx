import React from "react";
import Loguito from "../moleculas/header/Loguito";

const MainHeader = ({ children }) => {
  return (
    <div className="flex ">
      <Loguito />
      {children}
    </div>
  );
};

export default MainHeader;
