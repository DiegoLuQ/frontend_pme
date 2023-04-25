import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AccionesUpdate from "../organismos/AccionesUpdate";
import Presupuesto from "../organismos/YearsPresupuesto";
import Pme from "./Pme";

function Colegios() {
  const [colegio, setColegio] = useState([]);
  const [pme, setPme] = useState([]);
  const [load, setLoad] = useState(true);

  const { data, errror, loading } = useFetch("colegio/pme/");
  useEffect(() => {
    if (data) {
      setColegio(data);
      setPme(data.map((item) => item.pme_colegio));
      setLoad(false);
    }
  }, [data]);
  if (loading) return <h1>loading</h1>;
  console.log(colegio)
  return (
    <>
      <div className="font-bold text-5xl text-center text-gray-600 my-7 bg-gray-300 md:bg-transparent py-6">
        Colegios
      </div>
      <div className="flex flex-col md:flex-row md:justify-between w-12/12 m-auto mt-2">
        {colegio.map((item) => (
          // console.log(item)
          <div
            key={item._id}
            className="flex flex-col md:w-[49%] text-center gap-2"
          >
            <h2
              className={
                item.nombre == "Macaya"
                  ? "text-3xl text-green-600 font-bold"
                  : "text-3xl text-blue-600 font-bold"
              }
              key={item._id}
            >
              {item.nombre}
            </h2>
            <div className="bg-gray-300 py-2 px-2 relative">
              <p className="flex gap-3">
                <span className="font-bold">Dirección:</span> {item.direccion}
              </p>
              <p className="flex gap-3">
                <span className="font-bold">RBD:</span> {item.rbd}
              </p>
              <p className="flex gap-3">
                <span className="font-bold">RUT:</span> {item.rut}
              </p>
              <p className="flex gap-3">
                <span className="font-bold">Telefono:</span> {item.telefono}
              </p>
              <Pme id={item._id} colegio={item.nombre} />
              <Presupuesto id_colegio={item._id}  colegio={item.nombre} />
            </div>
            <div className="flex flex-row items-center md:flex md:flex-row md:justify-center mb-4">
              <Link
                to={`/gestion/${item.nombre}/${item._id}`}
                className={
                  item.nombre == "Macaya"
                    ? "text-green-600 font-bold text-base md:text-lg md:px-2 mx-2 py-1 bg-gray-800 mt-2 w-[100%] md:w-[70%] hover:bg-gray-700 cursor-pointer rounded-lg"
                    : "text-blue-500 font-bold text-base md:text-lg md:px-2 mx-2 py-1 bg-gray-800 mt-2 w-[100%] md:w-[70%] hover:bg-gray-700 cursor-pointer rounded-lg"
                }
              >
                Gestionar {item.nombre}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="">
        <h1 className="my-3 text-center">Ultimas Acciones modificadas</h1>
        <div>
          <AccionesUpdate />
        </div>
      </div>
      <div className="my-4 text-center">
        <Link className="text-orange-600 font-bold text-base md:text-lg md:px-2 mx-2 py-1 bg-gray-800 mt-2 w-[100%] md:w-[70%] hover:bg-gray-700 cursor-pointer rounded-lg">Nuevo Colegio</Link>
      </div>
    </>
  );
}

export default Colegios;
