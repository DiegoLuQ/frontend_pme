import React, { useEffect } from "react";

const MainPDF = ({ datosPDF }) => {
  if (Object.keys(datosPDF).length === 0) {
    datosPDF = {usuario:"", area:"", info:{req_para:"", req_tipo:""}}
  }

  return (
    <div className="col-span-3 h-min-[150px] border rounded-lg">
      <div className="gap-3 col-span-2 p-2">
        <div className="flex flex-col gap-1 justify-center">
          <div className="grid grid-cols-5 p-1  h-auto">
            <label className="col-span-2 text-left text-sm">De</label>
            <p className="col-span-3 text-sm">{datosPDF && datosPDF.usuario}</p>
          </div>
          <div className="grid grid-cols-5 p-1  h-auto">
            <label className="col-span-2 text-left text-sm">Dependencia</label>
            <p className="col-span-3 text-sm">{datosPDF && datosPDF.area}</p>
          </div>
        </div>
        <div className="grid grid-cols-5 p-1  h-auto">
          <label className="col-span-2 text-left text-sm">Para</label>
          <p className="col-span-3 text-sm">{datosPDF && datosPDF.info.req_para}</p>
        </div>
        <div className="grid grid-cols-5 p-1  h-auto">
          <label className="col-span-2 text-left text-sm">Tipo Req.</label>
          <p className="col-span-3 text-sm">{datosPDF && datosPDF.info.req_tipo}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default MainPDF;
