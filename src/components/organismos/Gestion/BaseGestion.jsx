import React from "react";

const BaseGestion = (props) => {
  return (
    <div className="mt-4 border rounded-lg p-3 w-12/12">
        {props.children}
    </div>
  );
};

export default BaseGestion;
