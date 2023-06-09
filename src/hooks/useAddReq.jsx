import { useContext } from "react";
import { AddItemProvider } from "../context/ReqProvider";

const useAddReq = () => {
  return useContext(AddItemProvider);
};

export default useAddReq;
