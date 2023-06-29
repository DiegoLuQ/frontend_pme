import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

import useFetch from "../../hooks/useFetch";
import axios from "axios";

function Certificado() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const datito = location.state.actividad;
  const [actividadPME, setActividadPME] = useState();
  const arraySubdimension = params.subdimension.split(",");
  const [dataAccion, setDataAccion] = useState([]);
  const [director, setDirector] = useState([]);
  const [modal, setModalVisible] = useState(false);
  const [load, setLoad] = useState(true);
  const { data, error, loading } = useFetch(
    `accion/actividades/?uuid_accion=${params.uuid_accion}&id_pme=${params.id}&year=${params.year}`
  );
  if (!params && !location) {
    return;
  }
  const goBack = () => {
    navigate.goBack();
  };

  const onModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (data) {
      setDataAccion(data[0]);
      setActividadPME(datito);
    }
    axios
      .get(`${import.meta.env.VITE_API}/colegio/${params.name_colegio}`)
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
      <div className="max-w-[1440px] m-auto">
        <div className="flex flex-col justify-start max-w-[900px] m-auto py-2">
          {modal ? (
            <div
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div
                className="fixed inset-0 bg-black opacity-25"
                onClick={closeModal}
              ></div>
              <div className="relative w-full max-w-2xl md:max-w-4xl max-h-full">
                <div className="relative rounded-lg shadow dark:bg-gray-700 bg-gray-700">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {/* Inputs */}
                  <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-white">
                      Edificar Actividad de la acción
                    </h3>
                    <form className="space-y-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-white">
                          Actividad
                        </label>
                        <textarea
                          name="actividad"
                          className="border outline-none p-1 bg-gray-500 text-white"
                          defaultValue={actividadPME}
                          onChange={(e) => setActividadPME(e.target.value)}
                          cols="110"
                          rows="3"
                        ></textarea>
                      </div>
                      <div></div>
                      <button
                        type="submit"
                        onClick={closeModal}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Modificar Recursos
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <button
            onClick={onModal}
            className="bg-green-400 hover:bg-green-500 px-2 py-1 my-2"
          >
            Editar actividad
          </button>
          <div className="flex gap-2">
            <Link
              to={`/user/colegios/${params.name_colegio}/recursos/${params.year}/${params.id}`}
              className="bg-slate-400 hover:bg-slate-300 px-2 rounded-md"
            >
              ⬅️Ir a Actividades
            </Link>
            <Link
              to={`/user/colegios/${params.name_colegio}/pme/${params.year}/${params.id}`}
              className="bg-slate-400 hover:bg-slate-300 hover:rounded-lg rounded-lg px-2"
            >
              ⬅️Ir a Acciones
            </Link>
          </div>
        </div>
        <hr />
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
                  params.name_colegio == "Macaya"
                    ? "https://i.postimg.cc/fbXSL2zp/mc.png"
                    : "https://i.postimg.cc/QdvWjG3c/dp.png"
                }
                alt=""
                width="80px"
              />
            </div>
            <div className="">
              <p>
                {params.name_colegio === "Macaya"
                  ? "Fundación Educacional Macaya"
                  : "Fundación Educacional Puerto Nuevo"}
              </p>
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
                  params.name_colegio == "Macaya"
                    ? "https://i.postimg.cc/fbXSL2zp/mc.png"
                    : "https://i.postimg.cc/QdvWjG3c/dp.png"
                }
                alt=""
                width="80px"
              />
              <div>
                <p className="font-bold">{director.director}</p>
                <p>Director</p>
                <p className="italic">
                  {params.name_colegio === "Macaya"
                    ? "Fundación Educacional Macaya"
                    : "Fundación Educacional Puerto Nuevo"}
                </p>
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
                  {params.name_colegio === "Macaya"
                    ? "Fundación Educacional Macaya"
                    : "Fundación Educacional Puerto Nuevo"}
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
