import React from "react";

function Fecha() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 mt-2">
      <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">Fecha</label>
        <input
          className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
          type="date"
          min="2018-01-01"
          max="2042-12-31"
        />
      </div>
    </div>
  );
}

export default Fecha;
