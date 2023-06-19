import axios from "axios";

export const getAccionesRequest = async (id_pme) => await axios.get(`${import.meta.env.VITE_API}/pme/acciones/${id_pme}`);
