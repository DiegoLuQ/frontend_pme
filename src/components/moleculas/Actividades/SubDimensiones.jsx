import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SubDimensiones = ({ subdimensiones }) => {
  const params = useParams();
  const [subdimension, setSubDimension] = useState([]);
  useEffect(() => {
    if (subdimensiones) {
      setSubDimension(subdimensiones);
    }
  }, [subdimensiones]);
  return (
    <div className="font-semibold italic flex flex-col">
      {subdimension.map((item, index) => (
        <Link
          // to={`/admin/colegios/${params.colegio}/certificado/${params.year}/${params.id}/${params.uuid_accion}/${item}`}
          key={index}
          className="text-cyan-600 hover:text-cyan-800"
        >
          {" "}
          {item}{" "}
        </Link>
      ))}
    </div>
  );
};

export default SubDimensiones;
