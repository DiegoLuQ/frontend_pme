import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";

const Recursos = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [recursos, setRecursos] = useState([]); // Array de actividades y sus recursos
  const [modal, setModalVisible] = useState(false); // cuando abrimos y cerramos el modal
  const [RecursosData, setRecursosData] = useState(); // Lista de los recursos de la actividad
  const [newRecurso, setNewRecurso] = useState(""); // Agregando nuevo recurso
  const { data, error, loading } = useFetch(`recursos/${params.id}`); // la data
  const [modalDetalle, setModalDetalle] = useState(false);
  const [recursoReq, setRecursoReq] = useState("");
  const [modalReq, setModalReq] = useState(false);

  const { auth } = useContext(AuthContext);
  const [btnOn, setBtnOn] = useState({}); //
  const options = {
    hour12: false,
    timeZone: "America/Santiago",
    hour: "numeric",
    minute: "numeric",
  };
  const [hora, setHora] = useState(
    new Date().toLocaleTimeString("es-CL", options)
  );

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
  const handleFilterRegex = () => {
    const dataBuscar = {
      actividad: filtroActividad,
      recurso_interno: filtroRecurso,
      recurso_pme: filtroRecursoPME,
      usuario: auth.usuario,
      fecha: fecha,
      hora: hora,
    };
    console.log(dataBuscar);
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
    setRecursos(resultadoFiltrado);
  };

  const onModal = (data) => {
    setModalVisible(true);
    if (data) {
      setRecursosData(data);
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
    }
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
  const handleAddItem = () => {
    if (newRecurso.trim() !== "") {
      RecursosData.recursos_actividad.push(newRecurso);
      setNewRecurso("");
    }
  };

  const handleUpdateActividad = () => {
    const id_actividad = RecursosData._id;
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
        console.log(resp);
      });
  };
  // usamo el hook useNavigate para enviar parametros y un state al
  // componente de Certificado
  const handleCertificadoClick = (data) => {
    navigate(
      `/admin/colegios/${params.name_colegio}/certificado/${params.year}/${params.id}/${data.uuid_accion}/${data.subdimension}`,
      {
        state: {
          actividad: data.nombre_actividad,
        },
      }
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
        <div className="flex gap-2">
          <button className="py-2 px-3 bg-green-600 hover:bg-green-500 text-white hover:text-black rounded-xl">
            Nueva Actividad
          </button>
          <button className="py-2 px-3 bg-yellow-500 hover:bg-yellow-400 text-white hover:text-black rounded-xl">
            Descargar Excel
          </button>
        </div>
      </div>
      <div className="w-full mt-2">
        <table className="w-full ">
          {/* <caption className="p-3">
            <nav aria-label="Page navigation example" className="">
              <ul className="inline-flex -space-x-px">
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Atras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Adelante
                  </a>
                </li>
              </ul>
            </nav>
          </caption> */}
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
                    to={`/admin/colegios/${params.name_colegio}/actividades/${params.year}/${params.id}/${item.uuid_accion}`}
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
                      Certificado
                    </button>
                    <button
                      onClick={() => onModalDetalle(item)}
                      className="font-bold text-xs px-2 hover:bg-orange-500 bg-orange-400 py-1 rounded-2xl"
                    >
                      Detalle
                    </button>
                    {/* <button
                      onClick={() => onModalReq(item)}
                      className="text-white font-bold text-xs px-2 hover:bg-blue-500 bg-blue-400 py-1 rounded-2xl"
                    >
                      Req
                    </button> */}
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
            <div className="fixed inset-0 bg-black opacity-25"></div>
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
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Actividad
                      </label>
                      <input
                        name="nombre_actividad"
                        id="nombre_actividad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="actividad"
                        defaultValue={RecursosData.nombre_actividad}
                        required
                      />
                    </div>
                    <div>
                      <div className="">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-white"
                        >
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
                              onClick={handleAddItem}
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
                    {/* <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                          />
                        </div>
                        <label
                          htmlFor="remember"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Lost Password?
                      </a>
                    </div> */}
                    <button
                      type="submit"
                      onClick={handleUpdateActividad}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Modificar Recursos
                    </button>
                  </div>
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
              onClick={() => console.log("Hola")}
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
                  <div className="space-y-6">
                    <div>
                      <div className="flex gap-2">
                        <div className="w-6/12">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Recurso para Requerimiento
                          </label>
                          <input
                            name="nombre_actividad"
                            id="nombre_actividad"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="actividad"
                            value={recursoReq}
                            required
                            autoComplete={"off"}
                          />
                        </div>
                        <div className="w-6/12">
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Cantidad
                          </label>
                          <input
                            name="nombre_actividad"
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                            autoComplete={"off"}
                            defaultValue={1}
                            min={0}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2 flex-wrap">
                        {RecursosData.recursos_actividad.map((item, index) => (
                          <button
                            onClick={() => setRecursoReq(item)}
                            className="text-white p-1 border bg-sky-800 hover:bg-sky-700"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6/12">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Prioridad
                        </label>
                        <select
                          name=""
                          id=""
                          className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="normal">Normal</option>
                          <option value="medio">Medio</option>
                          <option value="urgente">Urgente</option>
                          <option value="presupuesto">Presupuest</option>
                        </select>
                      </div>
                      <div className="w-6/12">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Area/Lugar
                        </label>
                        <input
                          name="nombre_actividad"
                          id="nombre_actividad"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Breve descripción del recurso solicitado"
                          required
                          autoComplete={"off"}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Detalle
                      </label>
                      <input
                        name="nombre_actividad"
                        id="nombre_actividad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Detalle o S/D"
                        autoComplete={"off"}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Justificación
                      </label>
                      <input
                        name="nombre_actividad"
                        id="nombre_actividad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Porqué del recurso solicitado"
                        required
                        autoComplete={"off"}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Descripción
                      </label>
                      <input
                        name="nombre_actividad"
                        id="nombre_actividad"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Breve descripción del recurso solicitado"
                        required
                        autoComplete={"off"}
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={handleUpdateActividad}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Modificar Recursos
                    </button>
                  </div>
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
            <div className="fixed inset-0 bg-black opacity-25"></div>
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
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
                        Dimensión
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.dimension}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
                        Sub Dimensión
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.subdimension}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
                        Actividad
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.nombre_actividad}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
                        Medios de verificación
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.medios_ver}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
                        Area o Responsable
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.responsable}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
                        Descripción
                      </label>
                      <p className="text-white font-semi italic">
                        {RecursosData.descripcion_actividad}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-base font-medium text-teal-400"
                      >
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
