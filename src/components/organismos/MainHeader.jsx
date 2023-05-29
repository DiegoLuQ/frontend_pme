import React from "react";
import Loguito from "../moleculas/header/Loguito";

const MainHeader = ({ children }) => {
  return (
    <div className="flex md:w-full px-3">
      <Loguito />
      {children}
    </div>
  );
};

export default MainHeader;
