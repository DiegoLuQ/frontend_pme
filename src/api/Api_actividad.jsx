import axios from "axios";



export const postActividadRequest = async (data) => axios.post(`${import.meta.env.VITE_API}/recursos/register`, data)
export const getActividadesExcelRequest = async (id_pme) => axios.get(`${import.meta.env.VITE_API}/recursos/descargar/pme/${id_pme}`)
