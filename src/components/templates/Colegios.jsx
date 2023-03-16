import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Pme from "./Pme";

function Colegios() {
  const [colegio, setColegio] = useState([]);
  const [pme, setPme] = useState([]);
  const [load, setLoad] = useState(true);

  const { data, errror, loading } = useFetch('colegio/pme/');
  useEffect(() => {
    if (data) {
      setColegio(data);
      setPme(data.map((item) => item.pme_colegio));
      setLoad(false);
    }
  }, [data]);

  if (loading) return <h1>loading</h1>;

  return (
    <>
      <div className="font-bold text-5xl text-center text-gray-600 my-7 bg-gray-300 md:bg-transparent py-6">
        Colegios
      </div>
      <div className="flex flex-col md:flex-row md:justify-between w-10/12 m-auto mt-2 ">
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
            </div>
            <div className="flex flex-col items-center md:flex md:flex-row md:justify-between mb-4">
              <Link
                to="/gestion"
                className={
                  item.nombre == "Macaya"
                    ? "text-green-600 font-bold text-base md:text-lg md:px-2 py-1 bg-gray-800 mt-2 w-[50%] md:w-[30%] hover:bg-gray-700 cursor-pointer rounded-lg"
                    : "text-blue-500 font-bold text-base md:text-lg md:px-2 py-1 bg-gray-800 mt-2 w-[50%] md:w-[30%] hover:bg-gray-700 cursor-pointer rounded-lg"
                }
              >
                Editar
              </Link>
              <Link
                to="/gestion"
                className={
                  item.nombre == "Macaya"
                    ? "text-green-600 font-bold text-base md:text-lg md:px-2 py-1 bg-gray-800 mt-2 w-[50%] md:w-[30%] hover:bg-gray-700 cursor-pointer rounded-lg"
                    : "text-blue-500 font-bold text-base md:text-lg md:px-2 py-1 bg-gray-800 mt-2 w-[50%] md:w-[30%] hover:bg-gray-700 cursor-pointer rounded-lg"
                }
              >
                Eliminar
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="bg-red-400">
        {pme.map((item, index) => (
          <div className="" key={index}>
            <Pme key={index} data={item} />
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Colegios;
