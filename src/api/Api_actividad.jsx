import axios from "axios";



export const postActividadRequest = async (data) => axios.post(`${import.meta.env.VITE_API}/recursos/register`, data)