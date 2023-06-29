import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import AddItemContext from "../../context/ReqProvider";

const ContainerRecurso = () => {
  const params = useParams();
  const navigate = useNavigate();

  const {addActividad } =
    useContext(AddItemContext);
  const { auth } = useContext(AuthContext);
  const handleAgregarActividad = () => {
    navigate(
      `/user/colegios/${params.name_colegio}/recursos/${params.year}/${params.id}/registrar_actividad`
    );
  };
  const handleReqSinActividad = () => {
    addActividad({
      accion: "sin acción",
      dimension: "sin dimensión",
      subdimension: "sin subdimensión",
      actividad: "sin actividad",
    });
    navigate(`/user/usuarios/gestion/req`);
  };
  return (
    <div className="">
      <div className="px-2 my-2">
        {auth.admin ? (
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <button
                onClick={() => handleAgregarActividad()}
                className="py-2 px-3 bg-green-600 hover:bg-green-500 text-white hover:text-black rounded-xl"
              >
                Nueva Actividad
              </button>
              <a
                href={`${import.meta.env.VITE_API}/recursos/descargar/pme/${
                  params.id
                }`}
                className="py-2 px-3 bg-yellow-500 hover:bg-yellow-400 text-white hover:text-black rounded-xl"
              >
                Descargar Excel Actividades
              </a>
              <button className="py-2 px-3 bg-sky-500 hover:bg-sky-400 text-white hover:text-black rounded-xl">
                Busquedas de usuarios
              </button>
              <Link
                to={`/user/colegios/${params.name_colegio}/recursos/${params.year}/${params.id}`}
                className="py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-white hover:text-black rounded-xl"
              >
                Actividades
              </Link>
              
            </div>
            <div className="flex gap-2">
              <Link
                to={`/user/usuarios/gestion/req`}
                className="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white hover:text-black rounded-xl"
              >
                Ir Requerimiento
              </Link>
              <button
                onClick={() => handleReqSinActividad()}
                className="py-2 px-3 bg-gray-500 hover:bg-gray-400 text-white hover:text-black rounded-xl"
              >
                Crear Requerimiento sin actividad
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            {" "}
            <a
              href={`${import.meta.env.VITE_API}/recursos/descargar/pme/${
                params.id
              }`}
              className="py-2 px-3 bg-yellow-500 hover:bg-yellow-400 text-white hover:text-black rounded-xl"
            >
              Descargar Excel Recursos
            </a>
            <button
              onClick={() => handleReqSinActividad()}
              className="py-2 px-3 bg-gray-500 hover:bg-gray-400 text-white hover:text-black rounded-xl"
            >
              Requerimiento sin actividad
            </button>
            <Link
              to={`/user/usuarios/gestion/req`}
              className="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white hover:text-black rounded-xl"
            >
              Ir Requerimiento
            </Link>
          </div>
        )}
      </div>
      <hr className="my-3" />
      <Outlet />
    </div>
  );
};

export default ContainerRecurso;
