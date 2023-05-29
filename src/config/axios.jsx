import axios from "axios";

const ClientAxios = axios.create({
    baseURL : `${import.meta.env.VITE_API}/`
})

export default ClientAxios