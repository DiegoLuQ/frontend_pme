import axios from "axios";


export const postBusquedaRequest = async (data) => await axios.post(`${import.meta.env.VITE_API}/busqueda/`, data)