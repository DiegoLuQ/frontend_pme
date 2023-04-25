import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Colegios from "../components/templates/Colegios";
import Actividades from "../components/templates/Actividades";
import { Home } from "../components/webpages/Home";
import Macaya from "../components/templates/Macaya";
import Certificado from "../components/templates/Certificado";
import DetailAct from "../components/templates/DetailAct";
import PresupuestoColegio from "../components/templates/PresupuestoColegio";
import Gestion from "../components/templates/Gestion";
import Requerimiento from "../components/organismos/Gestion_Usuarios/Requerimiento";
import NotFound_404 from "../components/templates/NotFound_404";
import GestionPME from "../components/organismos/Gestion/GestionPME";
import GestionPresupuesto from "../components/organismos/Gestion/GestionPresupuesto";
import GestionColegio from "../components/organismos/Gestion/GestionColegio";
import GestionUsuarios from "../components/templates/GestionUsuarios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/colegios",
        element: <Colegios />,
      },
      {
        // ACCIONES
        path: "/colegios/:colegio/pme/:year/:id",
        element: <Macaya />,
      },
      {
        path: "/colegios/:colegio/actividades/:year/:id/:uuid_accion",
        element: <Actividades />,
      },
      {
        path: "/colegios/:colegio/certificado/:year/:id/:uuid_accion/:subdimension",
        element: <Certificado />,
      },
      {
        path: "/colegios/:name_colegio/detalles/:year/:id",
        element: <DetailAct />,
      },
      {
        path: "/colegios/:name_colegio/presupuesto/:year/:id",
        element: <PresupuestoColegio />,
      },
    ],
  },
  {
    path: "/gestion/:nombre_colegio/:id_colegio",
    element: <Gestion />,
    children: [

      {
        path: "/gestion/:nombre_colegio/:id_colegio/pme",
        element: <GestionPME />,
      },
      {
        path: "/gestion/:nombre_colegio/:id_colegio/presupuesto",
        element: <GestionPresupuesto />,
      },
      {
        path: "/gestion/:nombre_colegio/:id_colegio/modificar",
        element: <GestionColegio />,
      },
    ],
  },
  {
    path:"/usuarios/gestion",
    element: <GestionUsuarios />,
    children: [
      {
        path: "/usuarios/gestion/:nombre_colegio/:id_colegio/req",
        element: <Requerimiento />,
      },
    ]
  },
  {
    path: "/*",
    element: <NotFound_404 />,
  },
]);

export default router;
