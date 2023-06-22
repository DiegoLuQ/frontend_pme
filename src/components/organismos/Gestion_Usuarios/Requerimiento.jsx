import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import generarId from "../../../helpers/GenerarId";
import Input_Label from "../../atomos/Input_Label";
import OptionList from "../../atomos/OptionList";
import getFileNameWithNewExtension from "../../../helpers/NameImage";
import AuthContext from "../../../context/AuthProvider";
import AddItemContext from "../../../context/ReqProvider";
import ColegioContext from "../../../context/ColegioProvider";
import ReqGestionContext from "../../../context/ReqGestionProvider";
const Requerimiento = () => {
  const params = useParams();
  const navigate = useNavigate();

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

  const [btnOn, setBtnOn] = useState({}); //
  const { auth } = useContext(AuthContext);
  const {
    requerimientoList,
    accionPME,
    removeItem,
    setRequerimientoList,
    setAccionPME,
  } = useContext(AddItemContext);
  const { addRequerimientoColegio, getRequerimiento, requerimientoColegio } =
    useContext(ReqGestionContext);
  const { colegioInfo, addColegio } = useContext(ColegioContext);
  const [imgColegio, setImaColegio] = useState("");
  const [titleColegio, setTitleColegio] = useState("");
  const [urlActividad, setUrlActividad] = useState("");
  const [requerimientoAccion, setRequerimientoAccion] = useState({});
  const [recurso, setRecurso] = useState({});
  const [numeroArea, setNumeroArea] = useState("");

  const [datosParaRequerimiento, setDatosParaRequerimiento] = useState({});
  window.addEventListener("beforeunload", () => {
    const data = localStorage.getItem("colegioInfo");
    addColegio(JSON.parse(data));
  });

  const [img_dpmc, setImg_DPMC] = useState();
  const [value_id, setValue_id] = useState(generarId(img_dpmc));
  useEffect(() => {
    setRequerimientoAccion(accionPME);
  }, []);

  const handleVisualizarRequerimiento = async () => {
    // const dataTest = requerimientoColegio.codigo_req = generarId(img_dpmc)

    if (Object.keys(requerimientoColegio).length > 0) {
      const newCodigo_req = await generarId(img_dpmc);
      requerimientoColegio.requerimientos = requerimientoList;
      requerimientoColegio.codigo_req = newCodigo_req;
      requerimientoColegio.fecha = fecha;
      requerimientoColegio.hora = hora;
      requerimientoColegio.info.req_para =
        document.getElementsByName("req_para")[0].value;
      requerimientoColegio.info.req_tipo =
        document.getElementsByName("req_tipo")[0].value;
      requerimientoColegio.info.req_numero = numeroArea;

      navigate(`/user/usuarios/gestion/req/${newCodigo_req}`, {
        state: {
          imprimir: false,
        },
      });
      return;
    }

    // en caso de que el Context de Crear requerimiento no tenga datos y se deba llenar ciertos campos
    if (Object.keys(datosParaRequerimiento).length === 0) {
      console.log("debe llenar los campos de informacion en amarillo");
      setBtnOn({
        ok: true,
        msg: "Debe llenar los campos de información en amarillo",
        class: "text-red-500 font-semibold text-base text-center",
      });
      return;
    }
    navigate(
      `/user/usuarios/gestion/req/${
        document.getElementsByName("value_id")[0].value
      }`,
      {
        state: {
          imprimir: false,
        },
      }
    );

    const { area, cargo, usuario } = auth;
    const nombre_colegio = colegioInfo.data.nombre;
    const id_pme = colegioInfo.pme._id;
    addRequerimientoColegio({
      codigo_req: value_id,
      usuario,
      area,
      cargo,
      nombre_colegio,
      id_pme,
      fecha,
      hora,
      accion: requerimientoAccion,
      requerimientos: requerimientoList,
      info: { ...datosParaRequerimiento, req_numero: numeroArea },
    });
  };

  const handleInputChangeDatos = (e) => {
    setDatosParaRequerimiento({
      ...datosParaRequerimiento,
      [e.target.name]: e.target.value,
    });
    console.log(datosParaRequerimiento);
  };

  useEffect(() => {
    if (colegioInfo.data) {
      const data = colegioInfo;
      setImg_DPMC(data.data.nombre == "Macaya" ? "MC-" : "DP-");

      data.data.nombre == "Macaya"
        ? setImaColegio("https://i.postimg.cc/fbXSL2zp/mc.png")
        : setImaColegio("https://i.postimg.cc/QdvWjG3c/dp.png");

      data.data.nombre == "Macaya"
        ? setTitleColegio("Colegio Macaya")
        : setTitleColegio("Colegio Diego Portales");

      data.data &&
        setUrlActividad(
          `/user/colegios/${data.data.nombre}/recursos/${data.pme.year}/${data.pme._id}`
        );
    }
  });

  const handleRequerimiento = (e) => {
    e.preventDefault();
    if (e.target.req_prioridad.value == "Seleccionar prioridad...") {
      return false;
    }

    const datos = {
      cantidad: parseInt(e.target.req_cantidad.value),
      recurso: e.target.req_recurso.value,
      prioridad: e.target.req_prioridad.value,
      lugar_instalacion: e.target.area_instalacion.value,
      justificacion: e.target.req_justificacion.value,
      descripcion: e.target.req_descripcion.value,
      detalle: e.target.req_detalle.value,
    };
    addRequerimiento(datos);
  };

  const addRequerimiento = (requerimiento) => {
    console.log(requerimiento);
    setRequerimientoList([...requerimientoList, requerimiento]);
  };

  const handleEliminarRequerimiento = (index) => {
    removeItem(index);
  };
  const handleEditarRequerimiento = (requerimiento, index) => {
    console.log(requerimiento);
    document.getElementsByName("req_recurso")[0].value = requerimiento.recurso;
    document.getElementsByName("req_detalle")[0].value = requerimiento.detalle;

    document.getElementsByName("area_instalacion")[0].value =
      requerimiento.lugar_instalacion;
    document.getElementsByName("req_descripcion")[0].value =
      requerimiento.descripcion;
    document.getElementsByName("req_justificacion")[0].value =
      requerimiento.justificacion;
    document.getElementsByName("req_cantidad")[0].value =
      requerimiento.cantidad;
    document.getElementsByName("req_prioridad")[0].value =
      requerimiento.prioridad;
    handleEliminarRequerimiento(index);
  };

  const handleLimpiarInputsReq = () => {
    setRecurso("");
    document.getElementsByName("req_recurso")[0].value = "";
    document.getElementsByName("area_instalacion")[0].value = "";
    document.getElementsByName("req_descripcion")[0].value = "";
    document.getElementsByName("req_detalle")[0].value = "";
    document.getElementsByName("req_justificacion")[0].value = "";
  };

  const handleBuscarReq = async (codigo_req) => {
    const { data } = await getRequerimiento(codigo_req);
    // data.codigo_req = generarId(img_dpmc)
    console.log(data);
    if (data) {
      {
        if (data.requerimientos.length > 0) {
          setRequerimientoList(data.requerimientos);
          document.getElementsByName("req_para")[0].value = data.info.req_para;
          document.getElementsByName("req_tipo")[0].value = data.info.req_tipo;
          document.getElementsByName("req_numero")[0].value =
            data.info.req_numero;
        }
      }
    }
    document.getElementsByName("req_accion")[0].value = data.accion.accion;
    document.getElementsByName("req_dimension")[0].value =
      data.accion.dimension;
    document.getElementsByName("req_subdimension")[0].value =
      data.accion.subdimension;
    document.getElementsByName("req_actividad")[0].value =
      data.accion.actividad;
    addRequerimientoColegio(data);
  };
  const handleNuevoRequerimiento = () => {
    document.getElementsByName("value_id")[0].value = generarId(img_dpmc);
    addRequerimientoColegio({});
    setRequerimientoList([]);
    setValue_id(document.getElementsByName("value_id")[0].value);
    document.getElementsByName("req_accion")[0].value = "";
    document.getElementsByName("req_dimension")[0].value = "";
    document.getElementsByName("req_subdimension")[0].value = "";
    document.getElementsByName("req_actividad")[0].value = "";
    document.getElementsByName("req_para")[0].value = "";
    document.getElementsByName("req_tipo")[0].value = "";
    document.getElementsByName("req_numero")[0].value = "";
  };
  return (
    <div className="mt-4 border rounded-lg w-[1440px] m-auto">
      <div className="w-12/12 md:w-8/12 m-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col text-center">
            <div className="flex text-center justify-center">
              <img src={imgColegio} alt="" width="65px" />
            </div>
            <p>{titleColegio}</p>
            <p>Alto Hospicio</p>
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="value_id"
              className="text-2xl font-semibold text-center block outline-none border "
              // defaultValue={value_id}
              defaultValue={img_dpmc && value_id ? generarId(img_dpmc) : ""}
            />
            <div className="flex justify-between">
              <button
                onClick={() => handleNuevoRequerimiento()}
                className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-sm shadow "
              >
                Nuevo Req.
              </button>
              <button
                onClick={() =>
                  handleBuscarReq(
                    document.getElementsByName("value_id")[0].value
                  )
                }
                className="bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-sm shadow "
              >
                Buscar Req.
              </button>
            </div>
          </div>
        </div>
        <h1 className="my-4 text-base text-center md:text-2xl font-bold">
          SOLICITUD DE REQUERIMIENTOS OPERATIVOS (REPARACION-MANTENCION DE
          INFRAESTRUCTURA Y/O COMPRA DE ACTIVOS)
        </h1>
        <div className="border p-2">
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              De
            </label>
            <input
              type="text"
              name="req_user"
              defaultValue={auth.usuario}
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
            />
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              Dependencia
            </label>
            <input
              type="text"
              name="req_dependencia"
              defaultValue={auth.area}
              disabled={true}
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
            />
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              Fecha
            </label>
            <input
              type="date"
              name="req_fecha"
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
              name="req_hora"
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
          <div className="border-t-2 px-2 my-3">
            <div className="grid grid-cols-12 gap-2 mt-2">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Acción
              </label>
              <input
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 bg-yellow-100 hover:ring-inset ring-1 ring-blue-300"
                value={accionPME.accion}
                name="req_accion"
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Dimensión
              </label>
              <input
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 bg-yellow-100 hover:ring-inset ring-1 ring-blue-300"
                value={accionPME.dimension}
                name="req_dimension"
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Subdimensión
              </label>
              <input
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 bg-yellow-100 hover:ring-inset ring-1 ring-blue-300"
                value={accionPME.subdimension}
                name="req_subdimension"
                disabled={true}
              />
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Actividad
              </label>
              <input
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 bg-yellow-100 hover:ring-inset ring-1 ring-blue-300"
                value={accionPME.actividad}
                name="req_actividad"
                disabled={true}
              />
            </div>
            <div className="flex justify-end my-4 gap-2">
              <Link
                to={urlActividad}
                className="bg-sky-200 hover:bg-sky-300 px-2 py-1 rounded-xl"
              >
                Buscar Actividad
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              Para
            </label>
            <select
              type="text"
              name="req_para"
              onChange={handleInputChangeDatos}
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 bg-yellow-100 ring-blue-300"
            >
              <option>Selecciona a quien va dirigido</option>
              <option value="TIC'S">Tics</option>
              <option value="Mantención">Mantención</option>
              <option value="Gerencia de Operaciones">
                Gerencia de Operaciones
              </option>
            </select>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              Tipo de Requerimiento
            </label>
            <select
              type="text"
              name="req_tipo"
              onChange={handleInputChangeDatos}
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 bg-yellow-100 ring-blue-300"
            >
              <option>Selecciona el tipo</option>
              <option value="Compra">Compra</option>
              <option value="Servicio">Servicio</option>
              <option value="Logistica">Logística</option>
              <option value="Servicio y Compra">Servicio y Compra</option>
              <option value="Compra y Logistica">Compra y Logística</option>
            </select>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
              N° Req. según área
            </label>
            <input
              type="text"
              className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 bg-yellow-100 hover:ring-inset ring-1 ring-blue-300"
              name="req_numero"
              onChange={(e) => setNumeroArea(e.target.value)}
            />
          </div>
        </div>
        <br />
        <hr />
        <form onSubmit={handleRequerimiento}>
          <h1 className="text-3xl font-semibold">Requerimientos</h1>
          <div>
            <OptionList
              value_label="Prioridad"
              value_option="Seleccionar prioridad..."
              lista={["Normal", "Medio", "Urgente", "Presupuesto"]}
              name="req_prioridad"
            />
            <div className="grid grid-cols-12 gap-2 mt-2 items-center">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Recurso
              </label>
              <input
                type="text"
                name="req_recurso"
                placeholder="Recurso necesario - ej: Globos"
                required
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              />
            </div>

            <Input_Label
              value_label="Cantidad"
              name="req_cantidad"
              type_="number"
              placeholder="Cantidad de compra"
              value="1"
            />
            <div className="grid grid-cols-12 gap-2 mt-2 items-center">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Detalle
              </label>
              <input
                type="text"
                name="req_detalle"
                placeholder="Detalle - ej: Globos Verdes, 100globos verdes y 100globos azules"
                required
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              />
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2 items-center">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Lugar/Area
              </label>
              <input
                type="text"
                name="area_instalacion"
                placeholder="ej: Escenario - recuerde enviar por correo fotos de lo solicitado"
                required
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              />
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2 items-center">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Justificación
              </label>
              <input
                type="text"
                name="req_justificacion"
                placeholder="Motivo(breve) - ej: día del estudiante"
                required
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              />
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2 items-center">
              <label className="p-2 md:w-12/12 text-left col-span-4 hidden md:block">
                Descripción
              </label>
              <input
                type="text"
                name="req_descripcion"
                placeholder="ej:Colocar arco de globo en la parte superior del escenario"
                required
                className="col-span-12 md:col-span-8 p-2 w-[100%] rounded-lg border hover:ring-1 hover:ring-blue-500 hover:ring-inset ring-1 ring-blue-300"
              />
            </div>

            <div className="flex justify-end gap-2 items-center">
              <button
                type="submit"
                className="text-sm md:text-base px-2 py-2 rounded-lg bg-blue-500 hover:rounded-lg hover:bg-blue-600 text-white font-bold my-3"
              >
                Agregar
              </button>
              <p
                onClick={() => handleLimpiarInputsReq()}
                className="cursor-pointer text-sm md:text-base px-2 py-2 rounded-lg bg-green-600 hover:rounded-lg hover:bg-green-700 text-white font-bold my-3"
              >
                Limpiar
              </p>
            </div>
          </div>
        </form>
        {/* tabla */}
        <div className="overflow-auto">
          <table className="table border w-[100%]">
            <thead className="border-b-4 ">
              <tr className="text-xs md:text-base">
                <th>Editar</th>
                <th className="hidden md:block">Cant</th>
                <th className="border">Recurso</th>
                <th className="border">Prioridad</th>
                <th className="border">Instalación/Lugar</th>
                <th className="border">Motivo/justificación</th>
                <th className="border">Descripcion</th>
                <th className="border">Detalle</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className="text-xs md:text-base">
              {requerimientoList.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">
                    <button
                      onClick={() => handleEditarRequerimiento(item, index)}
                      className="bg-blue-100 px-3 rounded-lg text-md hover:bg-blue-200"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="text-center py-3 hidden md:block">
                    {item.cantidad}
                  </td>
                  <td className="text-center py-3">{item.recurso}</td>
                  <td className="text-center py-3">{item.prioridad}</td>
                  <td className="text-center ">{item.lugar_instalacion}</td>
                  <td className="text-center ">{item.justificacion}</td>
                  <td className="text-center ">{item.descripcion}</td>
                  <td className="text-center ">{item.detalle}</td>

                  <td className="text-center">
                    <button
                      onClick={() => handleEliminarRequerimiento(index)}
                      className="bg-red-100 px-3 rounded-lg text-md hover:bg-red-200"
                    >
                      Eliminar
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
        </div>
      </div>
      <div className="w-5/12 m-auto flex justify-center mt-4 gap-2 flex-col">
        <p className={btnOn.class}>{btnOn.msg} </p>
        <button
          onClick={() => {
            handleVisualizarRequerimiento();
          }}
          className="my-2 text-center bg-blue-300 hover:bg-blue-400 px-3 py-2 rounded-lg text-md text-black text-2xl"
        >
          Visualizar Requerimiento
        </button>
      </div>
    </div>
  );
};

export default Requerimiento;
