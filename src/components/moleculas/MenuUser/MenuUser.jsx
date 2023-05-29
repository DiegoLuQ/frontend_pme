import React from "react";
import { Link, useParams } from "react-router-dom";

const MenuUser = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <div className="w-[1000px] m-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-black italic p-3">Gestionar Modulos</h1>
          <h1 className="text-base text-black italic p-3">Administrador</h1>
        </div>
      </div>
      <div className="flex-col flex md:flex-row flex-wrap justify-center gap-3">
        <Link
          to={`/admin/usuarios/gestion/${params.nombre_colegio}/${params.id_colegio}/req`}
          className="flex items-center justify-center md:w-[14%] bg-blue-600 text-center hover:bg-blue-800 text-white font-bold text-lg"
        >
          Requerimientos
        </Link>
        <Link
          to={`/admin/usuarios/gestion/${params.nombre_colegio}/${params.id_colegio}/presupuesto`}
          className="flex items-center justify-center md:w-[14%] bg-teal-600 text-center hover:bg-teal-800 text-white font-bold text-lg"
        >
          Presupuesto
        </Link>
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
