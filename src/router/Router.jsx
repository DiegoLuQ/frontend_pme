import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Colegios from "../components/templates/Colegios";
import Actividades from "../components/templates/Actividades";
import { Home } from "../components/webpages/Home";
import Macaya from "../components/templates/Macaya";
import DiegoPortales from "../components/templates/DiegoPortales";
import Certificado from "../components/templates/Certificado";
import DetailAct from "../components/templates/DetailAct";


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
                path:'/colegio_dp/:year/:d_p/:id',
                element:<DiegoPortales />
            },
            {
                // ACCIONES
                path:'/colegios/:colegio/pme/:year/:id',
                element:<Macaya />
            },
            {
                path:'/colegios/:colegio/actividades/:year/:id',
                element:<Actividades />
            },
            {
                path:'/colegios/:colegio/certificado/:year/:id',
                element:<Certificado />
            },
            {
                path:'/colegios/:name_colegio/detalles/:year/:id',
                element:<DetailAct />
            },
            
        ]
    },
])

export default router