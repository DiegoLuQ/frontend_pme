import { createContext, useState } from "react";
import { getAccionesRequest } from "../api/Api_acciones";

const AccionesContext = createContext();

const AccionesProvider = ({ children }) => {
  const [acciones, setAcciones] = useState([]);

  const getAcciones = async (id_pme) => {
    const data = await getAccionesRequest(id_pme);
    localStorage.setItem("acciones",JSON.stringify(data.data[0].acciones_pme))
    setAcciones(data.data[0].acciones_pme);
  };


  return (
    <AccionesContext.Provider value={{ acciones, getAcciones, setAcciones }}>
      {children}
    </AccionesContext.Provider>
  );
};

export { AccionesProvider };
export default AccionesContext;
