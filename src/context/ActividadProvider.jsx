import { createContext, useState } from "react";
import { postActividadRequest } from "../api/Api_actividad";

const ActividadContext = createContext();

const ActividadProvider = ({ children }) => {
  const [actividad, setActividad] = useState();

  const postActividad = async (data) => {
    try {
       const res = await postActividadRequest(data)
       console.log(res)
       return res
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActividadContext.Provider value={{ postActividad }}>
      {children}
    </ActividadContext.Provider>
  );
};
export { ActividadProvider };
export default ActividadContext;
