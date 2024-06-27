import axios from "axios";

const ClientAxios = axios.create({
    baseURL : `http://186.64.122.223:81/v1/`
})

export default ClientAxios