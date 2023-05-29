import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../context/AuthProvider";

const DetailAct = () => {
  const params = useParams();
  const [detalles, setDetalles] = useState([]);
  const [rescursos, setRecursos] = useState([]);
  const { auth } = useContext(AuthContext);
  const { data, error, loading } = useFetch(
    `actividades/actividad_de_acciones/${params.id}`
  );
  useEffect(() => {
    if (data) {
      setDetalles(data);
      setRecursos(data.map((item) => item.detalle_lista));
    }
  }, [data]);
  if (loading) return <h1>Loading</h1>;

  const handleFilterRecurso = (e) => {
    // const filter_ = e.target.value.replace(/^\w/, (c) => c.toLowerCase());
    // {index + 1} {detail.toLowerCase()}
    const filter_ = e.target.value;
    const filtered = data.filter((item) => {
      return JSON.stringify(item).indexOf(filter_) !== -1;
    });
    setDetalles(filtered);
  };

  return (
    <div className="max-w-[990px] m-auto">
      <h1 className="font-bold text-2xl md:text-5xl text-center text-gray-600 mb-4">
        Actividades
      </h1>

      <div className="flex justify-between items-center py-2">
        <input
          onChange={handleFilterRecurso}
          type="text"
          placeholder="Buscar por actividad"
          className="border px-3 py-2 rounded-lg"
        />
        <Link
          to={`/admin/colegios/${params.name_colegio}/recursos/${params.year}/${params.id}`}
          className="bg-cyan-300 hover:bg-cyan-400 hover:text-gray-700 hover:rounded-lg text-base text-gray-700 font-semibold p-1 rounded-lg"
        >
          Ver Recursos
        </Link>
      </div>
      <div className="grid grid-cols-5 border bg-slate-500 text-white">
        <p className="col-span-2 p-3">Actividades</p>
        <p className="col-span-3 p-3">Acción</p>
      </div>
      {detalles.map((item, index) => (
        <div key={index} className="grid grid-cols-5 items-center border">
          <div className="col-span-2 p-3">{item.detalle_lista.join(", ")}</div>
          <div className="col-span-3 p-3 flex flex-col">
            <div>
              <span className="font-semibold">actividad:</span> {item.nombre}
            </div>
            <div>
              <span className="font-semibold">detalle:</span> {item.detalle}
            </div>
            <div>
              <span className="font-semibold">acción:</span>{" "}
              {item.acciones.nombre_accion}
            </div>
            <div className="flex gap-2 mt-4 text-white">
              <Link
                to={`/admin/colegios/${params.name_colegio}/actividades/${params.year}/${item.id_pme}/${item.uuid_accion}`}
                className="bg-blue-300 hover:bg-blue-400 hover:text-gray-700 hover:rounded-lg text-base text-gray-700 font-semibold p-1 rounded-lg"
              >
                Acción
              </Link>
              {auth.admin && (
                <Link className="bg-emerald-300 hover:bg-emerald-400 hover:text-gray-700 hover:rounded-lg text-base text-gray-700 font-semibold p-1 rounded-lg">
                  Detalle
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailAct;
