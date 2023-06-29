import { createContext, useState } from "react";
import { postActividadRequest, getActividadesExcelRequest } from "../api/Api_actividad";

const ActividadContext = createContext();

const ActividadProvider = ({ children }) => {
  const [actividad, setActividad] = useState();

  const postActividad = async (data) => {
    try {
       const res = await postActividadRequest(data)
       return res
    } catch (error) {
      console.log(error);
    }
  };

  const getActividadesExcel = async (id_pme) => {
    const res = await getActividadesExcelRequest(id_pme)
    return res
  }

  return (
    <ActividadContext.Provider value={{ postActividad, getActividadesExcel }}>
      {children}
    </ActividadContext.Provider>
  );
};
export { ActividadProvider };
export default ActividadContext;
