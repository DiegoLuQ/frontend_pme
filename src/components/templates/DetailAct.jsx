import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const DetailAct = () => {
  const params = useParams();
  const [detalles, setDetalles] = useState([]);
  const [rescursos, setRecursos] = useState([]);
  const { data, error, loading } = useFetch(
    `actividades/actividad_de_acciones/${params.id}`
  );
  console.log('id: ' + params.id)
  useEffect(() => {
    if (data) {
      setDetalles(data);
      console.log(detalles)
      setRecursos(data.map((item) => item.detalle_lista));
    }
  }, [data]);
  if (loading) return <h1>Loading</h1>;

  const handleFilterRecurso = (e) => {
    const filter_ = e.target.value.replace(/^\w/, (c) => c.toLowerCase() );
    const filtered = data.filter((item) => {
      return JSON.stringify(item).indexOf(filter_) !== -1;
    });
    setDetalles(filtered);
  };  
  return (
    <div className="max-w-[990px] m-auto">
      <div>
        <input
          onChange={handleFilterRecurso}
          type="text"
          placeholder="Buscar por recursos"
          className="border px-3 py-2 rounded-lg mb-3 w-[30%]"
        />
      </div>
      <div className="grid grid-cols-5 border bg-slate-500 text-white">
        <p className="col-span-2 p-3">Recursos</p>
        <p className="col-span-3 p-3">Actividad/Acción</p>
      </div>
      {detalles.map((item, index) => (
        <div key={index} className="grid grid-cols-5 items-center border">
          <div className="col-span-2 p-3">
            {item.detalle_lista.map((detail, index) => (
              <div key={index}>
                {index + 1} {detail.toLowerCase()}
                
              </div>
            ))}
          </div>
          <div className="col-span-3 p-3 flex flex-col">
          <div><span className="font-semibold">actividad:</span> {item.nombre}</div>
            <div><span className="font-semibold">detalle:</span> {item.detalle}</div>
            <div><span className="font-semibold">acción:</span> {item.acciones.nombre_accion}</div>
            <Link to={`/colegios/${params.name_colegio}/actividades/${params.year}/${item.uuid_accion}`} className="bg-cyan-500 hover:bg-cyan-400 hover:text-white hover:rounded-lg text-base text-gray-700 font-semibold p-1 rounded-lg max-w-[10%]">
              Acción
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailAct;
