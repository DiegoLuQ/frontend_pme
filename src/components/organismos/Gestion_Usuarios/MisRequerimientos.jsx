import React, { useContext, useEffect, useState } from "react";
import ReqGestionContext from "../../../context/ReqGestionProvider";
import AuthContext from "../../../context/AuthProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

const MisRequerimientos = () => {
  const { getRequerimientos, addRequerimientoColegio } =
    useContext(ReqGestionContext);
  const navigate = useNavigate();
  const [misRequerimientos, setMisRequerimientos] = useState([]);
  const { auth } = useContext(AuthContext);
  const params = useParams();
  useEffect(() => {
    const res = async () => {
      const data = await getRequerimientos(auth.area || params.area);
      if (data) {
        setMisRequerimientos(data);
      }
    };
    res();
  }, []);
  const handleImprimir = (data, value_id) => {
    navigate(
      `/user/usuarios/gestion/req/${value_id}`, {
        state: {
          imprimir:true
        }
      }
    );
    addRequerimientoColegio(data);
  };
  return (
    <div className="mt-4 border rounded-lg w-[1440px] m-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-sm text-start px-2 w-1/12">Codigo</th>
            <th className="text-sm text-start px-2 w-1/12">Fecha</th>
            <th className="text-sm text-start px-2 w-1/12">Usuario</th>
            <th className="text-sm text-start px-2 w-3/12">Acción</th>
            <th className="text-sm text-start px-2 w-2/12">Actividad</th>
            <th className="text-sm text-start px-2 w-1/12">N° Req</th>
            
            {/* <th className="text-sm text-start px-2 w-4/12">Recursos</th> */}
            <th className="text-sm text-center px-2 w-2/12">Enlace</th>
          </tr>
        </thead>
        <tbody>
          {misRequerimientos.map((item, index) => (
            <tr key={index} className="text-xs border hover:bg-gray-200">
              <td className="p-2">{item.codigo_req}</td>
              <td className="p-2">{item.fecha}</td>
              <td className="p-2">{item.usuario}</td>
              <td className="p-2">{item.accion.accion}</td>
              <td className="p-2">{item.accion.actividad}</td>
              <td className="p-2">{item.info.req_numero}</td>
              
              {/* <td className="text-center p-2">
                <div className="grid grid-cols-5 gap-4">
                  {item.requerimientos.map((recurso, i) => (
                    <div className="" key={i}>
                      {recurso.recurso}
                    </div>
                  ))}
                </div>
              </td> */}
              <td className="p-2">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleImprimir(item, item.codigo_req)}
                    className="px-2 py-1 rounded-lg drop-shadow-xl bg-red-200 hover:bg-red-300"
                  >
                    Visualizar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisRequerimientos;
