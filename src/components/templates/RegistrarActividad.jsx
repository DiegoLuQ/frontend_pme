import React, { useContext, useEffect, useState } from "react";
import AccionesContext from "../../context/AccionesProvider";
import { postActividadRequest } from "../../api/Api_actividad";
import ActividadContext from "../../context/ActividadProvider";

const RegistrarActividad = () => {
  const [recursos, setRecursos] = useState([]);
  const [newRecurso, setNuevoRecurso] = useState("");
  const [btnOn, setBtnOn] = useState({}); //
  const [nuevaActividad, setNuevaActividad] = useState();
  const { acciones, setAcciones } = useContext(AccionesContext);
  const [colegioData, setColegioData] = useState();
  const [subdimensionDeAccion, setSubdimensionDeAccion] = useState();
  const [accionData, setAccionData] = useState();
  const [dimension, setDimension] = useState();
  const { postActividad } = useContext(ActividadContext);
  const cargarColegioInfo = () => {
    const dataColegioInfo = localStorage.getItem("colegioInfo");
    const dataAcciones = localStorage.getItem("acciones");
    setColegioData(JSON.parse(dataColegioInfo));
    setAcciones(JSON.parse(dataAcciones));
  };

  useEffect(() => {
    cargarColegioInfo();
  }, []);
  const handleDeleteRecursoIndex = (index) => {
    if (index >= 0) {
      const updateDataRecursos = [...recursos];
      updateDataRecursos.splice(index, 1);
      setRecursos(updateDataRecursos);
      console.log(recursos);
    }
  };
  const handleInputChangeNuevaActividad = (e) => {
    setNuevaActividad({ ...nuevaActividad, [e.target.name]: e.target.value });
  };
  const handleSelectAccion = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let data = acciones.find((accion) => accion._id === e.target.value);
    setAccionData(data);
    setSubdimensionDeAccion(data.subdimensiones);
    setDimension(data.dimension);
  };
  const handleInputChangeNewRecurso = (e) => {
    const recurso_nuevo = e.target.value.toLowerCase();
    console.log(recurso_nuevo);
    if (e.target.value !== "") {
      setBtnOn({
        ok: false,
        msg: "",
      });
    }
    if (recursos.length > 0) {
      if (recursos.includes(recurso_nuevo)) {
        setBtnOn({
          ok: true,
          msg: "El recurso ya existe",
          class: "text-red-500 font-semibold text-base text-center",
        });
      } else {
        setNuevoRecurso(e.target.value.toLowerCase());
      }
    } else {
      setNuevoRecurso(e.target.value.toLowerCase());
    }
  };
  const handleStringToList = () => {
    const listaNuevoRecursos = newRecurso.split(",");
    setRecursos(listaNuevoRecursos);
  };

  const handleRegistrarActividad = async (e) => {
    e.preventDefault();
    if (accionData == undefined) {
      setBtnOn({
        ok: true,
        msg: "Seleccione una acción",
        class: "text-red-500 font-semibold text-base text-center",
      });

      return;
    }
    if (nuevaActividad == undefined) {
      setBtnOn({
        ok: true,
        msg: "Debe llenar los campos",
        class: "text-orange-500 font-semibold text-base text-center",
      });
      return;
    }
    if (
      nuevaActividad.descripcion_actividad == undefined ||
      nuevaActividad.medios_ver == undefined ||
      nuevaActividad.responsable == undefined ||
      nuevaActividad.monto == undefined
    ) {
      setBtnOn({
        ok: true,
        msg: "Debe llenar los campos vacios",
        class: "text-orange-600 font-semibold text-base text-center",
      });
      return;
    }

    const data = {
      uuid_accion: accionData.uuid_accion,
      id_pme: accionData.id_pme,
      dimension,
      recursos_actividad: recursos,
      subdimension: nuevaActividad.subdimension,
      nombre_actividad: nuevaActividad.nombre_actividad,
      descripcion_actividad: nuevaActividad.descripcion_actividad,
      medios_ver: nuevaActividad.medios_ver,
      responsable: nuevaActividad.responsable,
      monto: parseInt(nuevaActividad.monto),
    };
    const res = await postActividad(data);
    if (res.status == 201) {
      setBtnOn({
        ok: true,
        msg: "Actividad registrada",
        class: "text-green-600 font-semibold text-base text-center",
      });
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="relative px-7 m-auto w-full max-h-full">
        <div className="grid grid-cols-12 relative rounded-lg shadow dark:bg-gray-700 bg-gray-700">
          {/* Inputs */}
          <div className="col-span-6 px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-white">
              Registrar actividad
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Actividad2
                </label>
                <input
                  name="nombre_actividad"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="actividad"
                  onChange={handleInputChangeNuevaActividad}
                  required
                />
              </div>
              <div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Nuevo recurso
                  </label>
                  <div className="">
                    <div className="flex flex-col gap-2 mb-2">
                      <input
                        type="text"
                        name="newrecurso"
                        placeholder="Nuevo Recurso"
                        onChange={handleInputChangeNewRecurso}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      />
                      <button
                        onClick={() => handleStringToList()}
                        disabled={btnOn.ok}
                        className="text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-4/12 rounded-lg text-sm px-2 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Agregar Recursos
                      </button>
                    </div>
                  </div>
                </div>
                <ul className="grid grid-cols-6 gap-2 mt-5">
                  {recursos.length > 0 ? (
                    <>
                      {" "}
                      {recursos.map((item, index) => (
                        <ol
                          key={index}
                          className="relative flex items-center  justify-center text-white p-3 text-center rounded-lg ring-1 ring-pink-500"
                        >
                          <button
                            onClick={() => handleDeleteRecursoIndex(index)}
                            className="absolute top-1 right-1 text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-400 rounded-lg text-sm p-1 ml-auto inline-flex items-center dark:hover:bg-pink-500 dark:hover:text-white"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          {item}
                        </ol>
                      ))}{" "}
                    </>
                  ) : (
                    <div>
                      <p className="text-white w-full">
                        No hay recursos
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-6 px-6 py-6 lg:px-8 flex flex-col gap-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                PME {colegioData && colegioData.pme.year}
              </label>
              <label className="block mb-2 text-sm font-medium text-white">
                ID {colegioData && colegioData.pme._id}
              </label>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Acciones
                </label>
                <select
                  name="act_pme_year"
                  id=""
                  onChange={handleSelectAccion}
                  className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
                >
                  <option value="" className="text-xs">
                    Acciones
                  </option>
                  {acciones.map((item, index) => (
                    <option value={item._id} className="text-xs" key={index}>
                      {item.nombre_accion}
                    </option>
                  ))}
                </select>
              </div>
              <div></div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Descripción de Actividad
              </label>
              <textarea
                name="descripcion_actividad"
                rows={3}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="descripción"
                onChange={handleInputChangeNuevaActividad}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Medio de Verificación
              </label>
              <input
                name="medios_ver"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Medios de verificación"
                onChange={handleInputChangeNuevaActividad}
                required
              />
            </div>
            <div className="flex w-12/12 gap-2">
              <div className="w-6/12">
                <label className="block mb-2 text-sm font-medium text-white">
                  Dimensión
                </label>
                <input
                  name="dimension"
                  onChange={handleInputChangeNuevaActividad}
                  defaultValue={dimension}
                  className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  placeholder="dimensión"
                  required
                />
              </div>
              <div className="w-6/12">
                <label className="block mb-2 text-sm font-medium text-white">
                  subdimensión
                </label>
                <select
                  name="subdimension"
                  onChange={handleInputChangeNuevaActividad}
                  className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
                >
                  <option className="text-xs">
                    Seleccione una subdimension
                  </option>
                  {subdimensionDeAccion &&
                    subdimensionDeAccion.map((item, index) => (
                      <option className="text-xs" key={index}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex w-12/12 gap-2">
              <div className="w-6/12">
                <label className="block mb-2 text-sm font-medium text-white">
                  Monto $
                </label>
                <input
                  name="monto"
                  className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  placeholder="Monto Aprox"
                  onChange={handleInputChangeNuevaActividad}
                  required
                  type="number"
                />
              </div>
              <div className="w-6/12">
                <label className="block mb-2 text-sm font-medium text-white">
                  Responsable
                </label>
                <input
                  name="responsable"
                  className="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  placeholder="Responsable"
                  onChange={handleInputChangeNuevaActividad}
                  required
                />
              </div>
            </div>
            <p className={btnOn.class}>{btnOn.msg}</p>
            <button
              onClick={handleRegistrarActividad}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrar Actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarActividad;
