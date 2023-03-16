import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Colegios from "../components/templates/Colegios";
import Actividades from "../components/templates/Actividades";
import { Home } from "../components/webpages/Home";
import Macaya from "../components/templates/Macaya";
import DiegoPortales from "../components/templates/DiegoPortales";
import Certificado from "../components/templates/Certificado";


const router = createBrowserRouter ([
    {
        path:'/',
        element: <App/>,
        children: [
            {
                index:true,
                element:<Home />
            },

            {
                path:'/colegios',
                element:<Colegios />
            },
            {
                path:'/:colegio/:year/:id',
                element:<Actividades />
            },
            {
                path:'/colegio_dp/:year/:d_p/:id',
                element:<DiegoPortales />
            },
            {
                path:'/colegio_mc/:year/:m_c/:id',
                element:<Macaya />
            },
            {
                path:'/:colegio/:year/certificado_pme/:id',
                element:<Certificado />
            },
            
        ]
    },
])

export default router