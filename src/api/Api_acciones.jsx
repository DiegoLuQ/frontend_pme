import axios from "axios";

export const getAccionesRequest = async (id_pme) => await axios.get(`${import.meta.env.VITE_API}/pme/acciones/${id_pme}`);
export const postCopiarAcciones = async (id_pme, new_id_pme, year) => await axios.post(`${import.meta.env.VITE_API}/accion/copiar/acciones/${id_pme}/${new_id_pme}/${year}`)