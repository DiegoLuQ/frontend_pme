import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../context/AuthProvider";
import ColegioContext from "../../context/ColegioProvider";
const Pme = ({ colegio, id, colegioDataApi }) => {
  const { addColegio, colegioInfo } = useContext(ColegioContext);
  const { auth } = useContext(AuthContext);
  const { data, error, loading } = useFetch(`pme/pme_colegio/${id}`);
  if (loading) return <h1>Loading</h1>;

  const handleClickColegioInfo = (data, pme) => {
    if (data) {
      const newData = {
        data, pme
      }
      localStorage.setItem('colegioInfo', JSON.stringify(newData))
      addColegio(newData);
    }
  };

  return (
    <div className="flex items-center">
      <div className="font-bold mr-2">PME:</div>
      {data.map((item) => (
        <div key={item._id}>
          <div className="border p-3 flex gap-1 flex-col items-center">
            <div className="flex items-center">
              <Link
               onClick={() => handleClickColegioInfo(colegioDataApi, item)}
                key={item._id}
                
                to={`/user/colegios/${colegio}/pme/${item.year}/${item._id}`}
                className={
                  colegio == "Macaya"
                    ? "text-base font-bold py-1 text-green-500 rounded-md hover:bg-gray-700 px-1"
                    : "text-base font-bold py-1 text-blue-500 rounded-md hover:bg-gray-600 px-1"
                }
              >
                Acciones {item.year}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                onClick={() => handleClickColegioInfo(colegioDataApi, item)}
                to={`/user/colegios/${colegio}/recursos/${item.year}/${item._id}`}
                className="bg-rose-300 hover:bg-rose-400 hover:text-gray-700 hover:rounded-lg text-base text-gray-700 font-semibold p-1 rounded-lg"
              >
                Recursos
              </Link>
              {auth.admin && (
                <Link
                  to="/user/usuarios/gestion"
                  className="bg-blue-300 hover:bg-blue-400 hover:text-gray-700 hover:rounded-lg text-base text-gray-700 font-semibold p-1 rounded-lg"
                >
                  Gestión
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pme;
