import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Input_Label from "../../atomos/Input_Label";
import OptionList from "../../atomos/OptionList";
import PrimaryBtn from "../../atomos/PrimaryBtn";
import axios from "axios";
import { postCopiarAcciones } from "../../../api/Api_acciones";
import { postCopiarActividades } from "../../../api/Api_actividad";

const CopiarAccionesAnterior = ({ data_id, id_new_pme, year_new_pme }) => {
  const { data, error, loading } = useFetch(`pme/pme_colegio/${data_id}`);
  const [pmeColegio, setPMEColegio] = useState([]);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [alert, setAlert] = useState("");
  const [dataPME, setDataPME] = useState({ _id: "", year: "" });
  useEffect(() => {
    if (data) {
      setPMEColegio(data);
    }
  }, [data]);
  if (loading) return <h1>Cargando</h1>;
  if (error) return <h1>Error</h1>;

  const handleSubmit = async (e) => {
    e.preventDefault(e.target.id_pme.value);
    console.log(e.target.id_pme.value);
    console.log(e.target.new_id_pme.value);
    console.log(typeof(e.target.pme_year.value));
    
    if (e.target.new_id_pme.value === e.target.id_pme.value) {
      setMostrarMensaje(true);
      setAlert("Los PME no deben ser iguales");
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
      return;
    }
    const res_acciones = await postCopiarAcciones(e.target.id_pme.value, e.target.new_id_pme.value, parseInt(e.target.pme_year.value))
    console.log(res_acciones)
    const res_actividades = await postCopiarActividades(e.target.id_pme.value, e.target.new_id_pme.value, parseInt(e.target.pme_year.value))
    console.log(res_actividades)
    setAlert("Acciones y Actividades copiadas con exito!");
  };
  function handleClick(year, _id) {
    const data2 = {
      _id,
      year,
    };
    setDataPME(data2);
    console.log(dataPME);
  }

  return (
    <div className="flex gap-5 m-auto w-12/12 my-4">
      <div className="w-4/12">
        <table className="w-12/12">
          <thead>
            <tr>
              <th>ID</th>
              <th>Año</th>
              <th>Director</th>
              <th>Elegir</th>
            </tr>
          </thead>
          <tbody>
            {pmeColegio.map((item, index) => (
              <tr className="border" key={item._id}>
                <td className="w-[10%]">{index + 1}</td>
                <td className="w-[10%]">{item.year}</td>
                <td className="w-[100%]">{item.director}</td>
                <td className="w-[20%]">
                  <button
                    onClick={() => handleClick(item.year, item._id)}
                    className="border bg-gray-600 hover:bg-gray-500 rounded-lg"
                  >
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-8/12">
        <div className="grid grid-cols-10 gap-1 items-center">
          <label htmlFor="" className="col-span-3 text-start">
            Datos Nuevo PME
          </label>
          <input
            defaultValue={id_new_pme ? id_new_pme : dataPME._id}
            className="p-1 rounded-lg border col-span-5"
            placeholder="ID de PME"
            name="new_id_pme"
          />
          <input
            defaultValue={year_new_pme ? year_new_pme : dataPME.year}
            className="p-1 rounded-lg border col-span-2"
            placeholder="Año de PME"
            name="pme_year"
            disabled
          />
        </div>
        <div className=" grid grid-cols-10 gap-1 items-center">
          <label className=" col-span-3 text-start">Año a copiar</label>
          <select
            name="id_pme"
            className="col-span-7 p-2 rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-900"
          >
            <option>Selecciona el año</option>
            {pmeColegio.map((item) => (
              <option value={item._id} key={item._id}>
                {item.year}
              </option>
            ))}
          </select>
        </div>
        <PrimaryBtn
          value="¿Desea registrar acciones de PME anterior?"
          class_="text-sm md:text-base w-[100%] md:w-[50%] md:font-base px-2 py-2 rounded-lg bg-orange-500 hover:rounded-lg hover:bg-orange-600 text-white font-bold my-3"
        />
        {mostrarMensaje && (
          <span className="text-1xl italic font-semibold text-green-500">
            {alert}
          </span>
        )}
      </form>
    </div>
  );
};

export default CopiarAccionesAnterior;
