import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Input_Label from "../../atomos/Input_Label";
import PrimaryBtn from "../../atomos/PrimaryBtn";
import BaseGestion from "./BaseGestion";
import axios from "axios";
import "./message.css"
const GestionColegio = () => {
  const params = useParams();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [alert, setAlert] = useState("");

  const [objColegio, setObjColegio] = useState({});
  const { data, error, loading } = useFetch(
    `colegio/buscar/?id_colegio=${params.id_colegio}`
  );
  useEffect(() => {
    if (data) {
      console.log(data.data);
      setObjColegio(data.data);
    }
  }, [data]);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Cargando</h1>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, direccion, telefono, rbd, rut, director } = e.target;
    const data = {
      nombre: nombre.value,
      direccion: direccion.value,
      telefono: telefono.value,
      rbd: rbd.value,
      rut: rut.value,
      director: director.value,
    };
    console.log(data);
    if (
      [
        data.direccion,
        data.nombre,
        data.telefono,
        data.rbd,
        data.rut,
        data.director,
      ].includes("")
    ) {
      setAlert("Debe ingresar todos los campos porfavor");
      setMostrarMensaje(true);
      setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
      return;
    }
    axios.patch(
      `${import.meta.env.VITE_API}/colegio/modificar/${params.id_colegio}`,
      data
    )
    .then(resp => {
      setAlert(resp.data.msg)
      setMostrarMensaje(true)
      setTimeout(() => {
        setMostrarMensaje(false)
      }, 3000)
    })
    .catch(err => {
      if(err.reponses.status == 400 || err.responses.status == 409) {
        setAlert(err.response.data.msg)
        setMostrarMensaje(true)
        setTimeout(() => {
          setMostrarMensaje(false)
        }, 3000);
      }
    })
  };
  return (
    <div>
      <BaseGestion>
        <form className="md:w-6/12 m-auto" onSubmit={handleSubmit}>
          <h1 className="text-3xl italic">
            Modificar Colegio {params.nombre_colegio}{" "}
          </h1>
          <div>
            <Input_Label
              value_label="Nombre del Colegio"
              placeholder="Nombre del Colegio"
              name="nombre"
              value={objColegio.nombre}
            />
            <Input_Label
              value_label="Dirección"
              placeholder="Dirección"
              name="direccion"
              value={objColegio.direccion}
            />
            <Input_Label
              value_label="telefono"
              placeholder="telefono"
              name="telefono"
              value={objColegio.telefono}
            />
            <Input_Label
              value_label="RBD"
              placeholder="RBD"
              name="rbd"
              value={objColegio.rbd}
            />
            <Input_Label
              value_label="RUT"
              placeholder="RUT"
              name="rut"
              value={objColegio.rut}
            />
          </div>
          <Input_Label
            placeholder="Nombre Director"
            value_label="Nombre del Director"
            name="director"
            value={objColegio.director}
          />
          <div className="flex items-center flex-col">
            <PrimaryBtn value="Modificar" />
            {mostrarMensaje && (
              <span className="text-1xl italic font-semibold text-red-500">
                {alert}
              </span>
            )}
          </div>
        </form>
      </BaseGestion>
    </div>
  );
};

export default GestionColegio;
