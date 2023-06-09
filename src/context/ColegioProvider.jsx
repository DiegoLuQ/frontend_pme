import { createContext, useEffect, useState } from "react";

const ColegioContext = createContext();

const ColegioProvider = ({ children }) => {
  const [colegioInfo, setColegioInfo] = useState({});

  const addColegio = (item) => {
    setColegioInfo(item);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("colegioInfo");
    if (storedData) {
      setColegioInfo(JSON.parse(storedData));
    }
  }, []);

  return (
    <ColegioContext.Provider
      value={{
        addColegio,
        colegioInfo,
      }}
    >
      {children}
    </ColegioContext.Provider>
  );
};

export { ColegioProvider };
export default ColegioContext;
