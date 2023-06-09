import { useState, useEffect, createContext } from "react";

const AddItemContext = createContext();

const AddItemProvider = ({ children }) => {
  const [requerimientoList, setRequerimientoList] = useState([]);
  const [accionPME, setAccionPME] = useState({});

  const addItem = (item) => {
    setRequerimientoList(item);
  };
  const addActividad = (item) => {
    setAccionPME(item);
  };
  const removeItem = (itemIndex) => {
    setRequerimientoList((prevList) =>
      prevList.filter((item, index) => index !== itemIndex)
    );
  };

  return (
    <AddItemContext.Provider
      value={{
        requerimientoList,
        setAccionPME,
        addItem,
        setRequerimientoList,
        removeItem,
        addActividad,
        accionPME
      }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export { AddItemProvider };
export default AddItemContext;
