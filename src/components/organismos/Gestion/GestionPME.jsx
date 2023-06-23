import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OptionList from "../../atomos/OptionList";
import Input_Label from "../../atomos/Input_Label";
import PrimaryBtn from "../../atomos/PrimaryBtn";
import axios from "axios";
import CopiarAccionesAnterior from "./CopiarAccionesAnterior";

function GestionPME() {
  const params = useParams();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [alert, setAlert] = useState("");
  const [newIDPME, setNewIDPME] = useState('')
  const [newYearPME, setNewYearPME] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      year: parseInt(e.target.year.value),
      observacion: `${
        e.target.observacion.value ? e.target.observacion.value : ""
      }`,
      director: e.target.director.value,
      id_colegio: params.id_colegio,
    };

    axios
      .post(`${import.meta.env.VITE_API}/pme/registrar_pme`, data)
      .then((resp) => {
        setAlert(resp.data.msg);
        setNewIDPME(resp.data.data._id)
        setNewYearPME(resp.data.data.year)
        setMostrarMensaje(true);
        setTimeout(() => {
          setMostrarMensaje(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.response && err.response.status == 409) {
          setAlert(err.response.data.msg);
          setMostrarMensaje(true);
          setTimeout(() => {
            setMostrarMensaje(false);
          }, 3000);
        } else {
          setAlert("Ocurrió un error al enviar los datos");
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
          Registrar PME {params.nombre_colegio}{" "}
        </h1>
        <div>
          <Input_Label
            value_label="ID del Colegio"
            placeholder="ID del Colegio"
            inhabilitado={true}
            value={params.id_colegio}
            name="id_colegio"
          />
          <OptionList
            value_label="Año"
            value_option="Seleccionar Año..."
            name="year"
            lista={[
              2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031,
              2032, 2033,
            ]}
          />
        </div>
        <Input_Label
          placeholder="Nombre Director"
          value_label="Nombre del Director"
          name="director"
        />
        <Input_Label
          placeholder="Observación"
          value_label="Observación"
          name="observacion"
        />
        <div className="flex flex-col justify-between items-center">
          <PrimaryBtn value="Registrar" />
          {mostrarMensaje && (
            <span className="text-1xl italic font-semibold text-red-500">
              {alert}
            </span>
          )}
        </div>
      </form>
      
      <hr />
      <br />
      <h1 className="text-3xl italic">Registrar Acciones de PME de Año Seleccionado</h1>
      <CopiarAccionesAnterior data_id={params.id_colegio} id_new_pme={newIDPME} year_new_pme={newYearPME}/>
      
    </div>
  );
}

export default GestionPME;
