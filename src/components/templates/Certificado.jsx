import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

import useFetch from "../../hooks/useFetch";
import axios from "axios";

function Certificado() {
  const location = useLocation();
  const datito = location.state.actividad
  const [actividadPME, setActividadPME] = useState(datito);

  const params = useParams();
  if (!params) {
    return;
  }
  console.log(params)
  const arraySubdimension = params.subdimension.split(",");
  const [dataAccion, setDataAccion] = useState([]);
  const [director, setDirector] = useState([]);
  const [load, setLoad] = useState(true);
  const { data, error, loading } = useFetch(
    `accion/actividades/?uuid_accion=${params.uuid_accion}&id_pme=${params.id}`
  );
  useEffect(() => {
    if (data) {
      setDataAccion(data[0]);
    }
    axios
      .get(`${import.meta.env.VITE_API}/colegio/${params.colegio}`)
      .then((respo) => {
        setDirector(respo.data.data);
        setLoad(false);
      });
  }, [data]);
  if (loading) return <h1>Loading..</h1>;

  const doc = new jsPDF("p", "pt", "letter", true, "UTF8");
  doc.setFont("helvetica");
  const handleClick = () => {
    const margin = 5;
    const scale =
      (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;
    doc.html(document.getElementById("paraPDF"), {
      x: 100,
      y: 10,
      margin: [4, 4, 4, 4], // mm
      width: 380, // 216 = letter paper width in mm, 208 = less the 8mm margin
      windowWidth: 816, // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      html2canvas: {
        windowWidth: 760, // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      },
      callback: function (doc) {
        doc.output("dataurlnewwindow", {
          filename: "pme.pdf",
          chartset: "utf8",
        });
      },
    });
  };

  return (
    <>
      <div className="hidden md:block max-w-[1440px] m-auto">
        <div
          className="grid grid-col-10 max-w-[900px] m-auto p-3 mt-4 mb-4"
          id="paraPDF"
          style={{ fontFamily: "Arial Unicode MS" }}
        >
          <div className="mt-4 flex justify-between items-center gap-5 mb-2">
            <div>
              <img
                // DEBES MODIFICAR EL TAMAÑO DE LA IMAGEN, PASALO A JPG
                src={
                  params.colegio == "Macaya"
                    ? "https://i.postimg.cc/fbXSL2zp/mc.png"
                    : "https://i.postimg.cc/QdvWjG3c/dp.png"
                }
                alt=""
                width="80px"
              />
            </div>
            <div className="">
              <p>Fundación Educacional {params.colegio}</p>
              <p>
                {director.direccion} FONO:{director.telefono}
              </p>
              <p>Alto Hospicio</p>
            </div>
          </div>
          <hr className="" />
          <div className="text-end">
            <p className="text-3xl font-bold mr-4">PME {params.year}</p>
          </div>
          <div className="mt-4 m-auto">
            <h1 className="font-bold text-4xl text-center my-10">
              Certificado de Acción SEP
            </h1>
            <div className="grid grid-cols-2 mt-3 text-2xl w-[820px] m-auto">
              <div className="grid grid-cols-5 mt-7">
                <label htmlFor="" className="text-start col-span-4">
                  Dimensión{" "}
                </label>
                <p className="text-end">:</p>
              </div>
              <div className="flex mt-7 ml-2">
                <p>{dataAccion.dimension}</p>
              </div>
              <div className="grid grid-cols-5 mt-7">
                <label htmlFor="" className="text-start col-span-4">
                  Subdimensión{" "}
                </label>
                <p className="text-end">:</p>
              </div>
              <div className="flex mt-7 ml-2">
                <div>
                  {arraySubdimension.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-5 mt-7">
                <label htmlFor="" className="text-start col-span-4">
                  Nombre de la Acción{" "}
                </label>
                <p className="text-end">:</p>
              </div>
              <div className="flex mt-7 ml-2">
                <p>{dataAccion.nombre_accion}</p>
              </div>
              <div className="grid grid-cols-5 mt-7">
                <label htmlFor="" className="text-start col-span-4">
                  Descripción de la acción
                </label>
                <p className="text-end">:</p>
              </div>
              <div className="flex mt-7 ml-2">
                <p>{dataAccion.descripcion}</p>
              </div>
              {actividadPME !== undefined ? (
                <div className="grid grid-cols-2 mt-3 text-2xl w-[820px] m-auto">
                  <div className="grid grid-cols-5 mt-7">
                    <label htmlFor="" className="text-start col-span-4">
                      Actividad de la acción
                    </label>
                    <p className="text-end">:</p>
                  </div>
                  <div className="mt-7 ml-2">{actividadPME}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="mt-16 flex justify-center my-40">
            <div className="flex gap-5">
              <img
                // DEBES MODIFICAR EL TAMAÑO DE LA IMAGEN, PASALO A JPG
                src={
                  params.colegio == "Macaya"
                    ? "https://i.postimg.cc/fbXSL2zp/mc.png"
                    : "https://i.postimg.cc/QdvWjG3c/dp.png"
                }
                alt=""
                width="80px"
              />
              <div>
                <p className="font-bold">{director.director}</p>
                <p>Director</p>
                <p className="italic">Fundacion educacional {params.colegio}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between my-6 px-[60px] text-2xl">
            <p>Alto Hospicio</p>
            <p>Firma Responsable</p>
          </div>
          <hr className="my-2" />
          <hr />
          <footer className="mt-8 flex justify-center">
            <div className="flex gap-5">
              <div className="">
                <p className="text-lg italic font-bold text-center">
                  Fundacion educacional {params.colegio}
                </p>
                <p className="text-lg font-bold text-center">
                  {director.direccion} - Fono: {director.telefono}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <div className="text-center flex gap-2 justify-center relative h-[100vh] md:h-[20vh]">
        <div className="flex items-center">
          <button
            onClick={handleClick}
            className="text-3xl px-2 md:px-4 my-3 text-center bg-cyan-600 hover:bg-cyan-500 text-white py-1 w-[100%] rounded-lg mt-2 font-bold"
          >
            Generar Certificado
          </button>
        </div>
      </div>
    </>
  );
}

export default Certificado;
