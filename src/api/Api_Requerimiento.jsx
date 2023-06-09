import axios from "axios";


export const requerimientoPostRequest = async (data) => await axios.post(`${import.meta.env.VITE_API}/requerimiento/registrar`, data)
export const requerimientoGetRequest = async (codigo_req) => await axios.get(`${import.meta.env.VITE_API}/requerimiento/${codigo_req}`)