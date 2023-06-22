import React from "react";

const ListaRecursos = ({ requerimiento }) => {
  return (
    <div className="overflow-auto my-4">
      <table className="table w-[100%] border">
        <thead className="">
          <tr className="text-xs">
            <th className="p-2">Cant</th>
            <th className="p-2">Recurso</th>
            <th className="p-2">Prioridad</th>
            <th className="p-2">Instalación/Lugar</th>
            <th className="p-2">Motivo/justificación</th>
            <th className="p-2">Descripcion</th>
            <th className="p-2">Detalle</th>
          </tr>
        </thead>
        <tbody className="">
          {requerimiento.map((item, index) => (
            <tr key={index} className="border">
              <td className="text-center text-xs py-2">{item.cantidad}</td>
              <td className="text-center text-xs py-2">{item.recurso}</td>
              <td className="text-center text-xs py-2">{item.prioridad}</td>
              <td className="text-center text-xs py-2">{item.lugar_instalacion}</td>
              <td className="text-center text-xs py-2">{item.justificacion}</td>
              <td className="text-center text-xs py-2">{item.descripcion}</td>
              <td className="text-center text-xs py-2">{item.detalle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaRecursos;
