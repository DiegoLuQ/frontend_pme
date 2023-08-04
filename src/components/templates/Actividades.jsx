import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import SubDimensiones from "../moleculas/Actividades/SubDimensiones";
import AuthContext from "../../context/AuthProvider";

const Actividades = () => {
  const params = useParams();
  const [dataAccion, setDataAccion] = useState([]);
  const [actividades, setActividades] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(
    `accion/actividades/?uuid_accion=${params.uuid_accion}&id_pme=${params.id}&year=${params.year}` //agregar id_pme para filtrar
  );
  useEffect(() => {
    if (data) {
      setActividades(data[0].actividades);
      setDataAccion(data[0]);
    }
  }, [data]);
  if (loading) return <h1>loading</h1>;

  const handleCertificadoClick = (data) => {
    navigate(
      `/user/colegios/${params.name_colegio}/actividades/${params.year}/${params.id}/${params.uuid_accion}/${dataAccion.subdimensiones}`,
      {
        state: {
          actividad: data.nombre_actividad,
          dimension: data.dimension,
          descripcion_actividad:data.descripcion_actividad
        },
      }
    );
  };

  const handleInputChangeBuscar = (e) => {
    const filter_ = e.target.value;
    const filtered = data[0].actividades.filter((item) => {
      return JSON.stringify(item).includes(filter_);
    });

    setActividades(filtered);
  };
  return (
    <div className="px-3">
      <h1 className="font-bold text-2xl md:text-5xl text-center text-gray-600">
        {params.name_colegio.toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 mt-2">
        {/* <div className="my-3 mx-3 flex gap-2">
          <Link className="px-3 text-center bg-orange-800 hover:bg-orange-600 text-white py-1 rounded-lg mt-2 font-bold">
            Editar Acción
          </Link>
        </div> */}
        <div className="bg-gray-300 p-2 text-sm">
          <p className="flex gap-2">
            <span className="font-bold">Dimensión: </span>{" "}
            {dataAccion.dimension}
          </p>
          <div className="flex gap-2">
            <span className="font-bold">Subdimensión:</span>{" "}
            <SubDimensiones subdimensiones={dataAccion.subdimensiones} />
          </div>
          <p className="flex gap-2 ">
            <span className="font-bold">Accion: </span>{" "}
            {dataAccion.nombre_accion}
          </p>
          <p className="flex gap-2">
            <span className="font-bold">Descripción:</span>{" "}
            {dataAccion.descripcion}
          </p>
        </div>
        <div className="flex flex-col mx-3 md:flex md:justify-between md:flex-row">
          {/* <Link className="text-center bg-teal-600 hover:bg-teal-500 text-white py-1 md:w-[18%] rounded-lg mt-2 font-bold">
            Agregar actividad
          </Link> */}
        </div>
      </div>
      <hr className="my-4" />
      <h1 className="font-bold text-start text-3xl mt-2">Actividades</h1>
      <input
        type="text"
        id="voice-search"
        onChange={handleInputChangeBuscar}
        className="my-3 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[250px] pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Buscar"
        required
      />

      <div>
        {actividades.map((item, index) => (
          <div key={item._id} className="w-12/12 m-auto hover:bg-gray-300">
            <div className="grid grid-cols-5 mt-1 items-center">
              <div className="col-span-3 md:col-span-2 text-sm md:text-base">
                {index + 1} - {item.nombre_actividad}
              </div>
              <div className="col-span-2 md:col-span-2 md:text-start text-sm md:text-base">
                {item.detalle}
              </div>
              <div className="hidden md:flex md:gap-2 md:justify-end">
                <button
                  onClick={() => handleCertificadoClick(item)}
                  className="bg-red-600 hover:bg-red-500 w-[150px] rounded-lg text-white"
                >
                  Certificado
                </button>
                {auth.admin && (
                  <button className="bg-sky-600 hover:bg-sky-500 w-[150px] rounded-lg text-white">
                    Editar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Actividades;
