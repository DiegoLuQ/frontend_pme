import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import useAddReq from "../../hooks/useAddReq";
import AddItemContext from "../../context/ReqProvider";
import ColegioContext from "../../context/ColegioProvider";
import { postBusquedaRequest } from "../../api/Api_busqueda";

const Recursos = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recursos, setRecursos] = useState([]); // Array de actividades y sus recursos
  const [RecursosData, setRecursosData] = useState(); // Lista de los recursos de la actividad
  const [newRecurso, setNewRecurso] = useState(""); // Agregando nuevo recurso
  const { data, error, loading } = useFetch(`recursos/${params.id}`); // la data
  const [modal, setModalVisible] = useState(false); // cuando abrimos y cerramos el modal
  const [recursoReq, setRecursoReq] = useState("");
  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalReq, setModalReq] = useState(false);
  const [addRequerimiento, setAddRequerimiento] = useState({});
  const [btnOn, setBtnOn] = useState({}); //
  const { auth } = useContext(AuthContext);
  const { setRequerimientoList, requerimientoList, addActividad } =
    useContext(AddItemContext);
  const { colegioInfo } = useContext(ColegioContext);
  const [cantidadReq, setCantidadReq] = useState();
  const handleInputChangeCantidad = (e) => {
    setCantidadReq(e.target.value);
  };

  const options = {
    hour12: false,
    timeZone: "America/Santiago",
    hour: "numeric",
    minute: "numeric",
  };
  const [hora, setHora] = useState(
    new Date().toLocaleTimeString("es-CL", options)
  );

  const handleClickRequerimiento = (e) => {
    e.preventDefault();
    const data = {
      cantidad: parseInt(e.target.req_cantidad.value),
      recurso: e.target.req_recurso.value,
      prioridad: e.target.req_prioridad.value,
      lugar_instalacion: e.target.req_lugar.value,
      justificacion: e.target.req_justificacion.value,
      descripcion: e.target.req_descripcion.value || "s/d",
      detalle: e.target.req_detalle.value || "s/d",
    };
    if (data) {
      console.log(data);
      setRequerimientoList([data, ...requerimientoList]);
      setBtnOn({
        ok: true,
        msg: "Item Agregado, no actualize la página",
        class: "text-green-500 font-semibold text-base text-center",
      });
    }
  };

  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  useEffect(() => {
    if (data) {
      setRecursos(data);
    }
  }, [data]);

  const handleFilterRecurso = (e) => {
    const filter_ = e.target.value;
    const filtered = data.filter((item) => {
      return JSON.stringify(item).indexOf(filter_) !== -1;
    });
    setRecursos(filtered);
  };

  const [filtroActividad, setFiltroActividad] = useState("");
  const [filtroRecurso, setFiltroRecurso] = useState("");
  const [filtroRecursoPME, setFiltroRecursoPME] = useState("");

  // const handleFilterItem = (e) => {
  //   const resultadosFiltrados = data.filter((item) => {
  //     const actividadCoincide = item.nombre_actividad.includes(filtroActividad || "")
  //     const recursoCoincide = item.recursos_actividad.includes(filtroRecurso || "")
  //     return actividadCoincide && recursoCoincide
  //   })
  //   console.log(resultadosFiltrados)
  // };
  // UTILIZANDO REGEx
  const handleFilterRegex = async () => {
    const regexActividad = new RegExp(filtroActividad, "i");
    const regexRecurso = new RegExp(filtroRecurso, "i");
    const regexRecursopme = new RegExp(filtroRecursoPME, "i");
    const resultadoFiltrado = data.filter((item) => {
      const actividadCoincide = regexActividad.test(item.nombre_actividad);
      const recursoCoincide = item.recursos_actividad.some((recurso) =>
        regexRecurso.test(recurso)
      );
      const recursoPME = regexRecursopme.test(
        item.accion.recursos_necesarios_ejecucion
      );
      return actividadCoincide && recursoCoincide && recursoPME;
    });
    if (resultadoFiltrado) {
      setRecursos(resultadoFiltrado);
      const dataBuscar = {
        actividad: filtroActividad,
        area: auth.area,
        data_length: resultadoFiltrado.length,
        fecha: fecha,
        hora: hora,
        recurso_interno: filtroRecurso,
        recurso_pme: filtroRecursoPME,
        usuario: auth.usuario,
        colegio: colegioInfo.data.nombre,
      };
      if (dataBuscar.data_length === 0) {
        console.log(dataBuscar);
        // await postBusquedaRequest(dataBuscar);
        return;
      }
      if (dataBuscar.data_length > 4) {
        console.log(dataBuscar);
        await postBusquedaRequest(dataBuscar);
      }
    }
  };

  const onModal = (data) => {
    setModalVisible(true);
    if (data) {
      setRecursosData(data);
      console.log(data);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalDetalle(false);
    setModalReq(false);
    setRecursoReq("");
    setBtnOn({});
  };

  const onModalDetalle = (data) => {
    setModalDetalle(true);
    if (data) {
      setRecursosData(data);
    }
  };
  const onModalReq = (data = {}) => {
    setModalReq(true);
    if (data) {
      setRecursosData(data);
      addActividad({
        accion: data.accion.nombre_accion,
        dimension: data.accion.dimension,
        subdimension: data.subdimension,
        actividad: data.nombre_actividad,
      });
    }
  };
  const handleReqSinActividad = () => {
    addActividad({
      accion: "sin acción",
      dimension: "sin dimensión",
      subdimension: "sin subdimensión",
      actividad: "sin actividad",
    });
    navigate(`/user/usuarios/gestion/req`);
  };
  const handleInputChangeNewRecurso = (e) => {
    const recurso_nuevo = e.target.value.toLowerCase();

    if (e.target.value !== "") {
      setBtnOn({
        ok: false,
        msg: "",
      });
    }
    if (RecursosData.recursos_actividad.includes(recurso_nuevo)) {
      setBtnOn({
        ok: true,
        msg: "El recurso ya existe",
        class: "text-red-500 font-semibold text-base text-center",
      });
    } else {
      setNewRecurso(e.target.value.toLowerCase());
    }
  };
  const handleAddItem = (e) => {
    if (newRecurso.trim() !== "") {
      RecursosData.recursos_actividad.push(newRecurso);
      console.log(RecursosData);
      setNewRecurso("");
    }
  };

  //botton de Modificar Recursos
  const handleUpdateActividad = (e) => {
    e.preventDefault();
    const id_actividad = RecursosData._id;
    const nombre_actividad_updated = e.target.actividad.value;
    RecursosData.nombre_actividad = nombre_actividad_updated.toLowerCase();
    const objParaEnviar = { ...RecursosData };
    delete objParaEnviar._id;
    delete objParaEnviar.accion;

    axios
      .patch(
        `${
          import.meta.env.VITE_API
        }/recursos/modificar_recurso/${id_actividad}`,
        objParaEnviar
      )
      .then((resp) => {
        setBtnOn({
          ok: true,
          msg: "Recurso de Actividad Modificada",
          class: "text-green-500 font-semibold text-base text-center",
        });
      });
  };
  // usamo el hook useNavigate para enviar parametros y un state al
  // componente de Certificado
  const handleCertificadoClick = (data) => {
    navigate(
      `/user/colegios/${params.name_colegio}/certificado/${params.year}/${params.id}/${data.uuid_accion}/${data.subdimension}`,
      {
        state: {
          actividad: data.nombre_actividad,
        },
      }
    );
  };

  const handleAgregarActividad = () => {
    navigate(
      `/user/colegios/${params.name_colegio}/recursos/${params.year}/${params.id}/registrar_actividad`
    );
  };

  const handleIndexRecurso = (index) => {
    if (index >= 0) {
      const updateDataRecursos = { ...RecursosData };
      updateDataRecursos.recursos_actividad.splice(index, 1);
      setNewRecurso(updateDataRecursos);
    }
  };
  if (error) return <h1>Hubo un error</h1>;
  if (loading) return <h1>Cargando</h1>;
  return (
    <div className="w-full px-2 m-auto mt-2">
      <h1 className="font-bold text-2xl md:text-5xl text-center text-gray-600 mb-4">
        Recursos de Actividades - {params.name_colegio}
      </h1>
      <div className="my-2">
        {auth.admin ? (
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <button
                // onClick={() => handleAgregarActividad()}
                className="py-2 px-3 bg-green-600 hover:bg-green-500 text-white hover:text-black rounded-xl"
              >
                Nueva Actividad
              </button>
              <button className="py-2 px-3 bg-yellow-500 hover:bg-yellow-400 text-white hover:text-black rounded-xl">
                Descargar Excel
              </button>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/user/usuarios/gestion/req`}
                className="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white hover:text-black rounded-xl"
              >
                Ir Requerimiento
              </Link>
              <button
                onClick={() => handleReqSinActividad()}
                className="py-2 px-3 bg-gray-500 hover:bg-gray-400 text-white hover:text-black rounded-xl"
              >
                Crear Requerimiento sin actividad
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            {" "}
            <Link
              to={`/user/usuarios/gestion/req`}
              className="py-2 px-3 bg-blue-500 hover:bg-blue-400 text-white hover:text-black rounded-xl"
            >
              Ir Requerimiento
            </Link>
            <button className="py-2 px-3 bg-yellow-500 hover:bg-yellow-400 text-white hover:text-black rounded-xl">
              Descargar Excel
            </button>{" "}
            <button
              onClick={() => handleReqSinActividad()}
              className="py-2 px-3 bg-gray-500 hover:bg-gray-400 text-white hover:text-black rounded-xl"
            >
              Requerimiento sin actividad
            </button>
          </div>
        )}
      </div>
      <div className="bg-teal-700 p-2 flex flex-col gap-2 items-center justify-between md:flex md:flex-row rounded-xl">
        <div className="flex gap-2">
          <input
            onChange={(e) => setFiltroActividad(e.target.value)}
            type="text"
            name="nombre_actividad"
            value={filtroActividad}
            placeholder="Buscar por actividad"
            className="border px-3 py-2 rounded-lg"
          />
          <input
            onChange={(e) => setFiltroRecurso(e.target.value)}
            type="text"
            name="recursos_actividad"
            value={filtroRecurso}
            placeholder="Buscar por recursos de PME interno"
            className="border w-[300px] px-3 py-2 rounded-lg"
          />
          <input
            onChange={(e) => setFiltroRecursoPME(e.target.value)}
            type="text"
            name="recursos_actividad_pme"
            value={filtroRecursoPME}
            placeholder="Buscar por recurso PME mineduc"
            className="border w-[275px] px-3 py-2 rounded-lg"
          />
          <button
            onClick={handleFilterRegex}
            className="py-1 px-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="w-full mt-2">
        <table className="w-full ">
          <thead className="">
            <tr className="">
              <th className="text-start border p-2"></th>

              <th className="text-start border p-2">Actividad</th>
              <th className="text-start border p-2">Recursos Internos</th>
              <th className="text-start border p-2">Area</th>
              <th className="text-start border p-2 text-blue-600">
                Link de Acción
              </th>
              <th className="text-start border p-2">Acción</th>
              <th className="border p-2 text-center">Enlaces</th>
              {auth.admin && <th className="text-start border p-2">Admin</th>}
            </tr>
          </thead>
          <tbody>
            {recursos.map((item, index) => (
              <tr key={item._id} className="border hover:bg-gray-200">
                <td className="border p-2 text-center">{index + 1}</td>

                <td className="border p-2">{item.nombre_actividad}</td>
                <td className="border p-2">
                  {item.recursos_actividad.join(", ")}
                </td>
                <td className="border p-2">{item.accion.responsable}</td>
                <td className="border p-2">
                  <Link
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                    to={`/user/colegios/${params.name_colegio}/actividades/${params.year}/${params.id}/${item.uuid_accion}`}
                  >
                    {item.uuid_accion}{" "}
                  </Link>{" "}
                </td>
                <td className="border p-2">{item.accion.nombre_accion}</td>
                <td className="border px-2 w-[180px]">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleCertificadoClick(item)}
                      className="font-bold text-xs px-2 hover:bg-green-600 bg-green-500 py-1 rounded-2xl"
                    >
                      Certif.
                    </button>
                    <button
                      onClick={() => onModalDetalle(item)}
                      className="font-bold text-xs px-2 hover:bg-orange-500 bg-orange-400 py-1 rounded-2xl"
                    >
                      Detalle
                    </button>
                    <button
                      onClick={() => onModalReq(item)}
                      className="text-white font-bold text-xs px-2 hover:bg-blue-500 bg-blue-400 py-1 rounded-2xl"
                    >
                      Requer.
                    </button>
                  </div>
                </td>
                {auth.admin && (
                  <td className="border px-2">
                    <button
                      onClick={() => onModal(item)}
                      className="font-bold text-xs px-2 hover:bg-sky-500 bg-sky-400 py-1 rounded-2xl"
                    >
                      Editar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {modal ? (
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div
              className="fixed inset-0 bg-black opacity-25"
              onClick={closeModal}
            ></div>
            <div className="relative w-full max-w-2xl md:max-w-4xl max-h-full">
              <div className="relative rounded-lg shadow dark:bg-gray-700 bg-gray-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
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
                {/* Inputs */}
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-white">
                    Modificar recursos de la actividad
                  </h3>
                  <form className="space-y-6" onSubmit={handleUpdateActividad}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">
                        Actividad
                      </label>
                      <input
                        name="actividad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="actividad"
                        defaultValue={RecursosData.nombre_actividad}
                        required
                      />
                    </div>
                    <div>
                      <div className="">
                        <label className="block mb-2 text-sm font-medium text-white">
                          Nuevo recurso
                        </label>
                        <div className="">
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              name="newrecurso"
                              placeholder="Nuevo Recurso"
                              onChange={handleInputChangeNewRecurso}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddItem()}
                              disabled={btnOn.ok}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Agregar
                            </button>
                          </div>
                          <p className={btnOn.class}>{btnOn.msg}</p>
                        </div>
                      </div>
                      <ul className="grid grid-cols-6 gap-2 mt-5">
                        {RecursosData.recursos_actividad.map((item, index) => (
                          <ol
                            key={index}
                            className="relative flex items-center  justify-center text-white p-3 text-center rounded-lg ring-1 ring-pink-500"
                          >
                            <button
                              type="button"
                              onClick={() => handleIndexRecurso(index)}
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
                        ))}
                      </ul>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Modificar Recursos
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {modalReq ? (
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div
              onClick={closeModal}
              className="fixed inset-0 bg-black opacity-25"
            ></div>
            <div className="relative w-full max-w-2xl md:max-w-4xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
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
                {/* Inputs */}
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Agregar recurso a requerimiento
                  </h3>
                  <form
                    className="space-y-6"
                    onSubmit={handleClickRequerimiento}
                  >
                    <div>
                      <div className="flex gap-2">
                        <div className="w-6/12">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Recurso
                          </label>
                          <input
                            name="req_recurso"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Selecciona un Recurso para el requerimiento"
                            defaultValue={recursoReq}
                            disabled={true}
                          />
                        </div>
                        <div className="w-6/12">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Cantidad
                          </label>
                          <input
                            name="req_cantidad"
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                            min={1}
                            defaultValue="1"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2 flex-wrap">
                        {RecursosData.recursos_actividad.map((item, index) => (
                          <a
                            key={index}
                            onClick={() => setRecursoReq(item)}
                            className="cursor-pointer text-white p-1 border bg-sky-800 hover:bg-sky-700"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Prioridad
                        </label>
                        <select
                          name="req_prioridad"
                          className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
                        >
                          {" "}
                          <option value="normal">Normal</option>
                          <option value="medio">Medio</option>
                          <option value="urgente">Urgente</option>
                          <option value="presupuesto">Presupuesto</option>
                        </select>
                      </div>
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Area/Lugar de Instalación
                        </label>
                        <input
                          name="req_lugar"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Lugar de Instalación - ej: Oficina de director"
                          required
                          autoComplete={"off"}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Detalle
                        </label>
                        <input
                          name="req_detalle"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Detalle del recurso - ej: tinta de impresora verde"
                          autoComplete={"off"}
                          required
                        />
                      </div>
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Justificación
                        </label>
                        <input
                          name="req_justificacion"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Porqué del recurso solicitado - ej: se acabo la tinta verde"
                          required
                          autoComplete={"off"}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Descripción
                        </label>
                        <input
                          name="req_descripcion"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="en caso de ser necesario o S/D"
                          required
                          autoComplete={"off"}
                        />
                      </div>
                      <div className="w-6/12">
                        <p className={btnOn.class}>
                          {btnOn.msg}{" "}
                          <span className="text-blue-300">
                            Cantidad de items{" "}
                          </span>
                          <span className="text-red-400 font-bold text-xl">
                            {requerimientoList.length}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2">
                      <button
                        type="submit"
                        className="w-8/12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Agregar recurso para Requerimiento
                      </button>
                      <Link
                        to={`/user/usuarios/gestion/req`}
                        className="w-4/12 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
                      >
                        Ir a requerimiento
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {modalDetalle ? (
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div
              className="fixed inset-0 bg-black opacity-25"
              onClick={closeModal}
            ></div>
            <div className="relative w-full max-w-2xl md:max-w-4xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
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
                {/* Inputs */}
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white">
                    Detalles de la Actividad
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Dimensión
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.dimension}
                      </p>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Sub Dimensión
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.subdimension}
                      </p>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Actividad
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.nombre_actividad}
                      </p>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Medios de verificación
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.medios_ver}
                      </p>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Area o Responsable
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.responsable}
                      </p>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Descripción
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.descripcion_actividad}
                      </p>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-teal-400">
                        Acción PME Mineduc
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.accion.nombre_accion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Recursos;
