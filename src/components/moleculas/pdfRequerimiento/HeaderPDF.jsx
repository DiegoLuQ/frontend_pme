import React from "react";

export const HeaderPDF = ({ nombre_colegio, value_id }) => {
  const LogoColegio =
    nombre_colegio == "Macaya"
      ? "https://i.postimg.cc/fbXSL2zp/mc.png"
      : "https://i.postimg.cc/QdvWjG3c/dp.png";

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex flex-col text-center">
          <div className="flex text-center justify-center">
            <img src={LogoColegio} alt="" width="40px" />
          </div>
          <p className="text-sm">{nombre_colegio}</p>
          <p className="text-sm">Alto Hospicio</p>
        </div>
        <label className="text-2xl font-semibold text-center">{value_id}</label>
      </div>
    </div>
  );
};
