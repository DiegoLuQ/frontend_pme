import React, { useContext } from "react";
import ReqGestionContext from "../../../context/ReqGestionProvider";
import { HeaderPDF } from "../../moleculas/pdfRequerimiento/HeaderPDF";
import MainPDF from "../../moleculas/pdfRequerimiento/MainPDF";
import AccionPDF from "../../moleculas/pdfRequerimiento/AccionPDF";
import ListaRecursos from "../../moleculas/pdfRequerimiento/ListaRecursos";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const PDFRequerimiento = () => {
  const params = useParams();
  const { requerimientoColegio, postRequerimiento } = useContext(ReqGestionContext);
  const doc = new jsPDF("p", "pt", "letter", "UTF8");
  const handleClick = () => {
    doc.html(document.getElementById("paraPDF"), {
      x: 10,
      y: 2,
      margin: [1, 1, 1, 1], // mm
      width: 216, // 216 = letter paper width in mm, 208 = less the 8mm margin
      windowWidth: 816, // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      html2canvas: {
        scale: 0.71, // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      },
      callback: function (pdf) {
        pdf.output("dataurlnewwindow");
        pdf.save("Req -" + requerimientoColegio.codigo_req + ".pdf");
      },
    });
    requerimientoColegio.codigo_req = params.codigo_req
    postRequerimiento(requerimientoColegio);
    navigate('/user/usuarios/gestion/req')
  };

  return (
    <div className=" md:block max-w-[1640px] m-auto ">
      <div
        id="paraPDF"
        className="grid grid-col-10 max-w-[900px] m-auto mt-4 mb-4 gap-2 rounded-xl p-2 "
      >
        <p className="my-4 text-base text-center md:text-1xl font-semibold">
          Solicitud de requerimientos operativos reparación-mantención de
          infraestructura y/o compra de activos del{" "}
          {requerimientoColegio.nombre_colegio}
        </p>
        <div>
          <HeaderPDF
            nombre_colegio={requerimientoColegio.nombre_colegio}
            value_id={params.codigo_req}
          />
        </div>
        {/* Datos del requerimiento */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center my-1">
            <h2 className="text-base font-bold text-gray-600">
              Datos del Requerimiento
            </h2>
            <div className="flex justify-end">
              <label className="">{requerimientoColegio.fecha}</label>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            <MainPDF datosPDF={requerimientoColegio} />
            <AccionPDF accion={requerimientoColegio.accion} />
          </div>
          <h2 className="text-base font-bold text-gray-600 text-center py-1">
            Requerimientos
          </h2>
          <ListaRecursos
            requerimiento={
              requerimientoColegio.requerimientos
                ? requerimientoColegio.requerimientos
                : []
            }
          />
          <div className="flex flex-col mt-10 items-end">
            <div className="w-[250px] border-t-2"></div>
            <p className="">Firma jefatura correspondiente</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          
          className="bg-green-300 hover:bg-green-400 px-3 py-2 rounded-lg text-md text-black text-2xl"
        >
          Crear Requerimiento
        </button>
      </div>
    </div>
  );
};

export default PDFRequerimiento;
