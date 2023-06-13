import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";

const MenuUser = () => {
  const {auth} = useContext(AuthContext)
  return (
    <div>
      <div className="w-[1000px] m-auto">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl text-black font-semibold p-3">Requerimientos</h1>
        </div>
      </div>
      <div className="flex-col flex md:flex-row flex-wrap justify-center gap-3">
        <Link
          to={`/user/usuarios/gestion/req`}
          className="flex items-center justify-center md:w-[14%] bg-blue-600 text-center hover:bg-blue-800 text-white font-bold text-lg"
        >
          Requerimientos
        </Link>
        <Link
          to={`/user/usuarios/gestion/mis_requerimientos/${auth.area}`}
          className="flex items-center justify-center md:w-[14%] bg-teal-600 text-center hover:bg-teal-800 text-white font-bold text-lg"
        >
          Mis Requerimientos
        </Link>
        {/* <Link
          to={`/user/usuarios/gestion/${params.nombre_colegio}/${params.id_colegio}/presupuesto`}
          className="flex items-center justify-center md:w-[14%] bg-teal-600 text-center hover:bg-teal-800 text-white font-bold text-lg"
        >
          Presupuesto
        </Link> */}
        <Link
          to="/"
          className="flex items-center justify-center md:w-[14%] bg-teal-600 text-center hover:bg-teal-800 text-white font-bold text-lg"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
};

export default MenuUser;
