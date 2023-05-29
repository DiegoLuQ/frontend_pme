import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import generarId from "../../../helpers/GenerarId";
import Fecha from "../../atomos/Fecha";
import Input_Label from "../../atomos/Input_Label";
import OptionList from "../../atomos/OptionList";
import PrimaryBtn from "../../atomos/PrimaryBtn";
import getFileNameWithNewExtension from "../../../helpers/NameImage";
const Requerimiento = () => {
  const params = useParams();
  const img_dpmc = params.nombre_colegio == "Macaya" ? "MC" : "DP";

  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const options = {
    hour12: false,
    timeZone: "America/Santiago",
    hour: "numeric",
    minute: "numeric",
  };
  const [hora, setHora] = useState(
    new Date().toLocaleTimeString("es-CL", options)
  );

  const [value_id, setValue_id] = useState(generarId(img_dpmc));
  const [listaRequerimiento, setListaRequerimiento] = useState([]);
  const [requirement, setRequirement] = useState({});
  const [image, setImagen] = useState(null);
  const [imagenes, setImagenes] = useState(null);
  const [imagenesRender, setImagenesRender] = useState([]);
  const [nombreImagen, setNombreImage] = useState([]);
  const newNameFile = [];
  const img_colegio =
    params.nombre_colegio == "Macaya"
      ? "https://i.postimg.cc/25sLgMny/mc.png"
      : "https://i.postimg.cc/2SXZ7V64/dp.png";
  const val_colegio =
    params.nombre_colegio == "Macaya"
      ? "Colegio Macaya"
      : "Colegio Diego Portales";

  const addRequerimiento = (requerimiento) => {
    setListaRequerimiento([...listaRequerimiento, requerimiento]);
  };

  const handleInputChangue = (e) => {
    const { name, value } = e.target;
    setRequirement({ ...requirement, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagen(e.target.result);
      };
      reader.readAsDataURL(selectImage);
      console.log(reader);
    } else {
      setImagen(null);
    }
  };

  const handleManyImages = (e) => {
    const selectImages = e.target.files;
    const urls = [];
    for (let i = 0; i < selectImages.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        urls.push(e.target.result);
        if (urls.length === selectImages.length) {
          setImagenes(urls);
        }
      };
      reader.readAsDataURL(selectImages[i]);
    }
  };
  const handleImagenesChangeRender = (e) => {
    const selectedImages = e.target.files;
    const urls = [];
    for (let i = 0; i < selectedImages.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 500;
          canvas.height = 500;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const url = canvas.toDataURL("image/jpeg", 0.8);
          urls.push(url);

          const new_name = getFileNameWithNewExtension(
            selectedImages[i],
            "jpg"
          );
          newNameFile.push(new_name);
          if (urls.length === selectedImages.length) {
            setImagenesRender(urls);
            setNombreImage(newNameFile);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(selectedImages[i]);
      console.log(nombreImagen);
    }
  };
  const handleRequerimiento = (e) => {
    e.preventDefault();
    if (e.target.prioridad.value == "Seleccionar prioridad...") {
      return false;
    }
    const datos = {
      cantidad: parseInt(e.target.cantidad.value),
      area_instalacion: e.target.area_instalacion.value,
      motivo: e.target.motivo.value,
      prioridad: e.target.prioridad.value,
      descripcion: e.target.descripcion.value,
    };
    addRequerimiento(datos);
    console.log(listaRequerimiento);
    // setRequirement({
    //   cantidad: 0,
    //   area_instalacion: "",
    //   motivo: "",
    //   prioridad: "",
    //   descripcion: "",
    // });
  };

  const handleEliminarRequerimiento = (index) => {
    const newRequerimiento = [...listaRequerimiento];
    newRequerimiento.splice(index, 1);
    setListaRequerimiento(newRequerimiento);
  };
  return (
    <div className="mt-4 border rounded-lg p-3 w-12/12">
      <div className="w-12/12 md:w-8/12 m-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-center">
            <div className="flex text-center justify-center">
              <img src={img_colegio} alt="" width="65px" />
            </div>
            <p>{val_colegio}</p>
            <p>Alto Hospicio</p>
          </div>
          <div className="text-2xl font-semibold">{value_id}</div>
        </div>
        <h1 className="my-4 text-base text-center md:text-2xl font-bold">
          SOLICITUD DE REQUERIMIENTOS OPERATIVOS (REPARACION-MANTENCION DE
          INFRAESTRUCTURA Y/O COMPRA DE ACTIVOS COLEGIO MACAYA)
        </h1>
        <div className="">
          <OptionList
            name="area"
            value_label="De"
            value_option="Buscar area..."
            lista={[
              "Dirección",
              "Inspectoria",
              "UTP Básica",
              "UTP Media",
              "Pre Básica",
              "Finanzas",
              "Contabilidad",
              "PIE",
            ]}
          />
          <OptionList
            name="subarea"
            value_label="Sub Areas"
            value_option="Buscar sub area..."
            lista={[
              "Patio 1",
              "Patio 2",
              "Oficina",
              "Escaleras",
              "Cancha de Futbol",
              "Cancha de Voley",
              "Auditorio",
              "Sala Audiovisual",
              "Biblioteca",
              "Sala de clase",
              "Sala de profesores",
              "Oficina de Dirección",
              "Oficina de UTP",
              "Oficina de Inspectoria",
            ]}
          />
          <Input_Label value_label="Para quien va dirigido" placeholder="" />
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              Fecha
            </label>
            <input
              type="date"
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              Hora
            </label>
            <input
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
        </div>
        <br />
        <hr />
        <form onSubmit={handleRequerimiento}>
          <h1 className="text-3xl font-semibold">Requerimientos</h1>
          <div>
            <Input_Label
              value_label="Lugar/Area"
              placeholder="Area de instalación"
              name="area_instalacion"
              value="Direccion"
            />
            <Input_Label
              value_label="Justificación"
              placeholder="Motivo(breve)"
              name="motivo"
              value="Direccion"
            />
            <OptionList
              value_label="Prioridad"
              value_option="Seleccionar prioridad..."
              lista={["Normal", "Medio", "Urgente", "Presupuesto"]}
              name="prioridad"
            />
            <Input_Label
              value_label="Cantidad"
              name="cantidad"
              type_="number"
              placeholder="Cantidad de compra"
              value="1"
            />
            <Input_Label
              value_label="Descripcion"
              placeholder="Descripcion requerimiento"
              name="descripcion"
              value="Direccion"
            />

            <div className="flex justify-end">
              <button className="text-sm md:text-base px-2 py-2 rounded-lg bg-blue-500 hover:rounded-lg hover:bg-blue-600 text-white font-bold my-3">
                Agregar
              </button>
            </div>
          </div>
        </form>
        {/* tabla */}
        <div className="overflow-auto">
          <table className="table border w-[100%]">
            <thead className="border-b-4">
              <tr className="text-xs md:text-base">
                <th className="hidden md:block">Cant</th>
                <th>Prioridad</th>
                <th>Instalación</th>
                <th>Motivo</th>
                <th>Descripcion</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-base">
              {listaRequerimiento.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 hidden md:block">{item.cantidad}</td>
                  <td className="py-3">{item.prioridad}</td>
                  <td>{item.area_instalacion}</td>
                  <td>{item.motivo}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <button
                      onClick={() => handleEliminarRequerimiento(index)}
                      className="bg-red-100 px-3 rounded-lg text-md"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <caption className="text-xs italic hidden md:block ">
              Requerimientos
            </caption>
          </table>
        </div>
        {/* Imagenes
        <h1>Subir una Imagen</h1>
        <div className="my-4 mt-3">
          <label htmlFor="imagenReq">Seleccionar imagen</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div>
            <img src={image} alt="" width="10%" />
          </div>
        </div>
        <h1>Subir Imagenes con su prpia Resolución</h1>
        <div className="my-4 mt-3">
          <label htmlFor="imagenReq">Seleccionar imagen</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleManyImages}
          />

          {!imagenes ? (
            <h1>Sin imagenes</h1>
          ) : (
            <div className="flex justify-center">
              {imagenes.map((imagen, index) => (
                <div key={index}>
                  <img
                    src={imagen}
                    alt={`Previsualización de la imagen ${index}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div> */}
        <h1>Imagenes Renderizadas</h1>
        <div className="my-4 mt-3">
          <label htmlFor="imagenReq">Seleccionar imagen para renderizar</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagenesChangeRender}
          />

          {!imagenesRender ? (
            <h1>Sin imagenes</h1>
          ) : (
            <div className="flex justify-center gap-2">
              {imagenesRender.map((imagen, index) => (
                <div key={index}>
                  <img
                    className="border"
                    src={imagen}
                    alt={`Previsualización de la imagen ${index}`}
                  />
                  <p>{nombreImagen[index]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:grid gap-3 md:grid-cols-12 mt-10">
          <div className="flex flex-col text-start justify-center md:col-span-10">
            <p className="text-sm text-gray-500">
              <span className="font-bold">Normal</span> = Trabajo o compra a
              realizarse dentro de quince días.{" "}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Medio</span> = Trabajo o compra a
              realizarse dentro de una semana.{" "}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-bold">Urgente</span> = Trabajo o compra a
              realizarse dentro de las 24 horas.{" "}
            </p>
          </div>
          <div className="py-20 md:mt-0 md:col-span-2">
            <div className=" border-t-2">
              <p>Firma jefatura correspondiente</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-12/12 flex justify-center mt-4">
        <button className="bg-green-300 hover:bg-green-400 px-3 py-2 rounded-lg text-md text-black text-2xl">
          Enviar requerimiento
        </button>
      </div>
    </div>
  );
};

export default Requerimiento;
