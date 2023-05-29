import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


// useContext sirve para extrar los datos del context
// authContext tienes que identificar que context debe extraer los datos

const useAuth = () => {
    return useContext(AuthContext)
}


export default useAuth