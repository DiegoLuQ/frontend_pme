import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const AccionesUpdate = () => {
  const [accionesUpdate, setAccionesUpdate] = useState([]);
  const { data, error, loading } = useFetch(`accion/update_acciones/`);
  useEffect(() => {
    if (data) {
      setAccionesUpdate(data);
    }
  }, [data]);
  if (loading) return <h1>Cargando Datos..</h1>;
  return (
    <div className="border p-3">
      {accionesUpdate.map((item, index) => (
        <div key={item._id}>
          {" "}
          {index + 1} {item.nombre_accion}{" "}
        </div>
      ))}
    </div>
  );
};

export default AccionesUpdate;
