import { useContext } from "react";
import { ColegioProvider } from "../context/ColegioProvider";

const useColegioInfo = () => {
  return useContext(ColegioProvider);
};

export default useColegioInfo;
