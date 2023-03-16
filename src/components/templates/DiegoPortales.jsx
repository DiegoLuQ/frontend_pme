import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

const DiegoPortales = () => {
  const params = useParams();
  const [dataColegio, setDataColegio] = useState([]);
  const { data, error, loading } = useFetch(`pme/acciones/${params.id}`);
  useEffect(() => {
    if (data) {
      setDataColegio(data[0].acciones_pme);
    }
  }, [data]);

  if (loading) return <h1>loading</h1>;
  return (
    <div className="">
      <h1 className="font-bold text-2xl md:text-5xl text-center text-gray-600">
        PME de {params.d_p.toUpperCase()} - {params.year}
      </h1>
      {dataColegio.map((item, index) => (
        <div className="flex items-center justify-between" key={item._id}>
          <Link
            to={`/${params.d_p}/${item._id}`}
            className="flex px-5 justify-between items-center mt-2"
            key={item._id}
          >
            <div className="flex gap-2 hover:bg-gray-300 duration-300 ease-in-out hover:rounded-lg rounded-lg px-2 w-[100%]">
              <p>{index + 1}</p>
              <p className="text-blue-600 hover:text-blue-800 cursor-pointer ">
                {item.nombre_accion}
              </p>
            </div>

          </Link>
            <Link
              to={`/${params.d_p}/${params.year}/${item._id}`}
              className="hidden md:block px-2 bg-teal-700 hover:bg-teal-600 rounded-lg font-semibold text-white"
            >
              Ver
            </Link>
        </div>
      ))}
    </div>
  );
};

export default DiegoPortales;
