import { createContext, useState } from "react";
import {
  requerimientoGetRequest,
  requerimientoPostRequest,
  requerimientosGetRequest,
} from "../api/Api_Requerimiento";

const ReqGestionContext = createContext();

const ReqGestionProvider = ({ children }) => {
  const [requerimientoColegio, setRequerimientoColegio] = useState({});

  const addRequerimientoColegio = (requerimiento) => {
    setRequerimientoColegio(requerimiento);
  };

  const postRequerimiento = async (data) => {
    await requerimientoPostRequest(data);
  };
  const getRequerimiento = async (codigo_req) => {
    const res = await requerimientoGetRequest(codigo_req);
    return res.data;
  };
  const getRequerimientos = async (area) => {
    try {
      const res = await requerimientosGetRequest(area);
      return res.data.data
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ReqGestionContext.Provider
      value={{
        addRequerimientoColegio,
        requerimientoColegio,
        postRequerimiento,
        getRequerimiento,
        getRequerimientos
      }}
    >
      {children}
    </ReqGestionContext.Provider>
  );
};
export { ReqGestionProvider };
export default ReqGestionContext;
