import { createContext, useState } from "react";
import {
  requerimientoGetRequest,
  requerimientoPostRequest,
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
    return res.data
};

  return (
    <ReqGestionContext.Provider
      value={{
        addRequerimientoColegio,
        requerimientoColegio,
        postRequerimiento,
        getRequerimiento,
      }}
    >
      {children}
    </ReqGestionContext.Provider>
  );
};
export { ReqGestionProvider };
export default ReqGestionContext;
