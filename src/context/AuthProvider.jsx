import { useState, useEffect, createContext } from "react";
import ClientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    const autenticarUsuario = async () => {
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        // Obtenemos la data que seria el payload del backend con los datos del usuario autenticado
        const { data } = await ClientAxios(
          `login/perfil?token=${token}`,
          config
        );
        // guardamos la data en el estado
        setAuth(data);
      } catch (error) {
        // en caso de recibir el codigo 401 booramos los datos del localStorage y como consecuencia nos enviara a la /login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          setAuth({});
        } else {
          console.error(error);
        }
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSession = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSession,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
