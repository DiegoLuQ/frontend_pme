import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const PresupuestoColegio = () => {
  const params = useParams();
  const [itemPresupuesto, setItemPresupuesto] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const { data, error, loading } = useFetch(`lista_presupuesto/${params.id}`);

  if (error) return <h1>Loading</h1>;
  if (loading) return <h1>Loading</h1>;
  console.log(params);
  
  const handleButtonFilter = () => {
    const filter = filterValues;
    const filtered = data.filter((item) => {
      //   return JSON.stringify(item).indexOf(filter) !== -1;
      return (
        item.descripcion.includes(filter.descripcion || "") &&
        item.mes_compra.includes(filter.mes || "") &&
        item.area.includes(filter.area || "") &&
        item.motivo_actividad.includes(filter.motivo || "") &&
        item.sub_area.includes(filter.subarea || "")
      );
    });
    if (filter == "") {
      setItemPresupuesto([]);
    } else {
      setItemPresupuesto(filtered);
    }
  };
  const hanldeFilterItem = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  return (
    <div className="px-3">
      <h1 className="text-center text-4xl font-bold italic text-teal-600">
        Presupuesto {params.name_colegio} - {params.year}
      </h1>
      <div className="flex gap-3 mt-3">
        <div className="flex flex-col gap-2 h-[90vh] sticky top-0">
          <div className="bg-gray-200 py-2 text-center">
            <h1 className="text-center text-2xl">Filtrar Por</h1>
            <span className="text-xs italic text-gray-500">Sensible a tildes</span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="area">Area</label>
            <input
              onChange={hanldeFilterItem}
              type="text"
              name="area"
              id="area"
              placeholder="Buscar por area"
              className="border px-3 py-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="area">Sub-area</label>
            <input
              onChange={hanldeFilterItem}
              type="text"
              name="subarea"
              id="subarea"
              placeholder="Buscar por subarea"
              className="border px-3 py-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="descripcion">Descripción</label>
            <input
              onChange={hanldeFilterItem}
              type="text"
              name="descripcion"
              id="descripcion"
              placeholder="Buscar por descripcion"
              className="border px-3 py-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="motivo">Motivo/Actividad</label>
            <input
              onChange={hanldeFilterItem}
              type="text"
              name="motivo"
              id="motivo"
              placeholder="Buscar por motivo"
              className="border px-3 py-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mes">Mes</label>
            <select
              name="mes"
              className="p-2 border rounded-lg"
              onChange={hanldeFilterItem}
            >
              <option value="">Selecciona un Mes</option>
              <option value="enero">Enero</option>
              <option value="febrero">Febrero</option>
              <option value="marzo">Marzo</option>
              <option value="abril">Abril</option>
              <option value="mayo">Mayo</option>
              <option value="junio">Junio</option>
              <option value="julio">Julio</option>
              <option value="agosto">Agosto</option>
              <option value="septiembre">Septiembre</option>
              <option value="noviembre">Octubre</option>
              <option value="noviembre">Noviembre</option>
              <option value="diciembre">Diciembre</option>
            </select>
          </div>
          <button
            onClick={handleButtonFilter}
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-white"
          >
            Filtrar
          </button>
        </div>
        <table className="w-10/12">
          <thead className="">
            <tr className="text-left border">
              <th className="p-2"> Area </th>
              <th className="p-2"> SubArea </th>
              <th className="p-2"> Descripción </th>
              <th className="p-2"> Presentación </th>
              <th className="p-2"> Mes Compra </th>
              <th className="p-2"> Motivo/Actividad </th>
            </tr>
          </thead>
          <tbody className="">
            {itemPresupuesto.map((item) => (
              <tr key={item._id} className="border hover:bg-gray-200">
                <td className="w-[10%] p-2"> {item.area} </td>
                <td className="w-[20%] p-2"> {item.sub_area} </td>
                <td className="w-[35%] p-2"> {item.descripcion} </td>
                <td className="w-[10%] p-2"> {item.presentacion} </td>

                <td className="w-[10%] p-2"> {item.mes_compra} </td>
                <td className="w-[35%] p-2"> {item.motivo_actividad} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PresupuestoColegio;
