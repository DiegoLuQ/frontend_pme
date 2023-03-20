import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const Pme = ({ colegio, id }) => {
  const [pme, setPme] = useState([]);
  const { data, error, loading } = useFetch(`pme/pme_colegio/${id}`);
  useEffect(() => {
    if (data) {
      setPme(data);
    }
  }, []);
  if (loading) return <h1>Loading</h1>;
  console.log(data)
  return (
    <div className="flex gap-1 items-center">
        <div className="font-bold">Años PME:</div>
        {data.map((item) => (
            <Link
            key={item._id}
            to={`/colegios/${colegio}/pme/${item.year}/${item._id}`}
            className={
              colegio== "Macaya"
                ? "text-base font-semibold py-1 text-green-500 rounded-md hover:bg-gray-700 px-1"
                : "text-base font-semibold py-1 text-blue-500 rounded-md hover:bg-gray-600 px-1"
            }
          >
            {item.year}
          </Link>
      ))}
    </div>
  );
};

export default Pme;
