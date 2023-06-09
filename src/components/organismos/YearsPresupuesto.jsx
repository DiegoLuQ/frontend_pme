import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const YearsPresupuesto = ({ id_colegio, colegio }) => {
  const { data, error, loading } = useFetch(`presupuesto/${id_colegio}`);
  if (error) return <h1>ERROR...</h1>;
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="flex gap-1">
      <span className="font-bold">Presupuesto:</span>
      {data.map((item) => (
        <Link
          key={item._id}
          to={`/user/colegios/${colegio}/presupuesto/${item.year}/${item._id}`}
          className={
            colegio == "Macaya"
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

export default YearsPresupuesto;
