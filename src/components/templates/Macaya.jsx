import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Macaya = () => {
  const params = useParams();
  const [dataColegio, setDataColegio] = useState([]);
  const { auth } = useContext(AuthContext);
  const [filterValues, setFilterValues] = useState({})
  const { data, error, loading } = useFetch(`pme/acciones/${params.id}`);
  useEffect(() => {
    if (data) {
      setDataColegio(data[0].acciones_pme);
      console.log(data);
    }
  }, [data]);
  const handleFilterAccion = (e) => {
    const filter_ = e.target.value.toLowerCase();
    const filtered = data[0].acciones_pme.filter((item) => {
      return JSON.stringify(item).indexOf(filter_) !== -1;
    });
    setDataColegio(filtered);
  };

  const handleFilterItem = (e) => {
    const {name, value} = e.target
    setFilterValues({...filterValues, [name]:value})
    const filter = filterValues;
    const filtered = data[0].acciones_pme.filter((item) => {
      return item.nombre_accion.includes(filter.nombre_accion || "");
    });
    if (filter == "") {
      setDataColegio([]);
    } else {
      setDataColegio(filtered);
    }
  }

  if (loading) return <h1>loading</h1>;
  return (
    <div className="max-w-[1200px] m-auto">
      <h1 className="font-bold text-2xl md:text-5xl text-center text-gray-600">
        PME de {params.colegio.toUpperCase()} - {params.year}
      </h1>
      <div className="flex mt-3 justify-center gap-2">
        {/* <Link
          to={`/admin/colegios/${params.colegio}/detalles/${params.year}/${params.id}`}
          className="flex gap-2 justify-center font-semibold duration-300 ease-in-out bg-slate-400 hover:bg-slate-500 hover:rounded-lg text-gray-200 rounded-lg px-2 md:w-[20%]"
        >
          Buscar Actividades o Recursos
        </Link> */}
        <Link className="flex gap-2 justify-center font-semibold duration-300 ease-in-out bg-green-800 hover:bg-green-700 hover:rounded-lg text-gray-200 rounded-lg px-2 md:w-[20%]">
          Descargar PME Excel
        </Link>
      </div>
      <div className="border rounded-xl p-3 ring-1 mt-3">
        <input
          onChange={handleFilterItem}
          type="text"
          name="nombre_accion"
          placeholder="Buscar acción"
          className="border my-3 px-3 py-2 rounded-lg w-6/12"
        />
        <hr />
        {dataColegio.map((item, index) => (
          <div
            className="flex justify-between items-center mt-2"
            key={item._id}
          >
            <Link
              to={`/user/colegios/${params.colegio}/actividades/${params.year}/${params.id}/${item.uuid_accion}`}
              className="flex gap-2 hover:bg-gray-300 duration-300 ease-in-out hover:rounded-lg rounded-lg px-2 w-[100%]"
            >
              <p>{index + 1}</p>
              <p
                className={
                  params.colegio == "Macaya"
                    ? "text-green-600 hover:text-green-800 cursor-pointer "
                    : "text-blue-600 hover:text-blue-800 cursor-pointer "
                }
              >
                {item.nombre_accion.toLowerCase()}
              </p>
            </Link>
            <div className="flex gap-2">
              <Link
                to={`/user/colegios/${params.colegio}/actividades/${params.year}/${params.id}/${item.uuid_accion}`}
                className="hidden md:block px-3 bg-teal-700 hover:bg-teal-600 rounded-lg font-semibold text-white text-center"
              >
                Ver
              </Link>
              {auth.admin && (
                <Link className="hidden md:block px-1 bg-teal-700 hover:bg-teal-600 rounded-lg font-semibold text-white text-center">
                  Editar
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Macaya;
