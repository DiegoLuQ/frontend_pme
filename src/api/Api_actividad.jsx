import axios from "axios";

export const postActividadRequest = async (data) =>
  axios.post(`${import.meta.env.VITE_API}/recursos/register`, data);
export const getActividadesExcelRequest = async (id_pme) =>
  axios.get(`${import.meta.env.VITE_API}/recursos/descargar/pme/${id_pme}`);

export const postCopiarActividades = async (id_pme, new_id_pme, year) =>
  await axios.post(
    `${import.meta.env.VITE_API}/recursos/copiar/actividades/${id_pme}/${new_id_pme}/${year}`
  );
