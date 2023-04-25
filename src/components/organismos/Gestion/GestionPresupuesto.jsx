import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OptionList from "../../atomos/OptionList";
import Input_Label from "../../atomos/Input_Label";
import PrimaryBtn from "../../atomos/PrimaryBtn";

function GestionPresupuesto() {
  const params = useParams()
  const [alert, setAlert] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      year: e.target.year.value,
      observacion: e.target.observacion.value,
      id_colegio: e.target.id_colegio.value,
    };
    console.log(data);
    if ([data.year, data.observacion, data.id_colegio].includes("")) {
      console.log("Debe estar los campones llenos");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API}/presupuesto/registrar`, data)
      .then((resp) => {
        setAlert(resp.data.msg);
        setMostrarMensaje(true);
        setTimeout(() => {
          setMostrarMensaje(false);
        }, 3000);
      })
      .catch((err) => {
        if(err.response.status == 409 ) {
          setAlert(err.response.data.msg);
          setMostrarMensaje(true);
          setTimeout(() => {
            setMostrarMensaje(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="mt-4 border rounded-lg p-3 w-12/12">
      <form className="md:w-6/12 m-auto" onSubmit={handleSubmit}>
        <h1 className="text-3xl italic">
          Registrar Presupuesto {params.nombre_colegio}{" "}
        </h1>
        <div className="">
          <Input_Label
            value_label="ID Presupuesto"
            placeholder="ID del Colegio"
            inhabilitado={true}
            value={params.id_colegio}
            name="id_colegio"
          />
          <OptionList
            value_option="Seleccionar Año..."
            name="year"
            value_label='Años'
            lista={[
              2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
              2032, 2033,
            ]}
          />
        </div>
        <Input_Label
          placeholder="Observación"
          value_label="Observación"
          name="observacion"
        />
        <div className="flex justify-between items-center">
          <PrimaryBtn value="Registrar" />
          {mostrarMensaje && (
            <span className="text-1xl italic font-semibold text-red-500">
              {alert}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default GestionPresupuesto;
