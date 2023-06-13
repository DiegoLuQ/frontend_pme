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
import Recursos from "../components/templates/Recursos";
import Login from "../components/templates/Login";
import RutaProtegida from "../components/templates/RutaProtegida";
import Prueba from "../components/templates/Prueba";
import RegistrarActividad from "../components/templates/RegistrarActividad";
import PDFRequerimiento from "../components/organismos/Gestion_Usuarios/PDFRequerimiento";
import MisRequerimientos from "../components/organismos/Gestion_Usuarios/MisRequerimientos";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/colegios",
        element: <Prueba />,
      }
    ],
  },
  {
    path: "/user",
    element: <RutaProtegida />,
    children: [
      {
        path: "/user/colegios",
        element: <Colegios />,
      },
      {
        // ACCIONES
        path: "/user/colegios/pasoporti",
        element: <Prueba />,
      },
      {
        // ACCIONES
        path: "/user/colegios/:colegio/pme/:year/:id",
        element: <Macaya />,
      },
      {
        path: "/user/colegios/:colegio/actividades/:year/:id/:uuid_accion",
        element: <Actividades />,
      },
      {
        path: "/user/colegios/:colegio/certificado/:year/:id/:uuid_accion/:subdimension",
        element: <Certificado />,
      },
      {
        path: "/user/colegios/:name_colegio/detalles/:year/:id",
        element: <DetailAct />,
      },
      {
        path: "/user/colegios/:name_colegio/recursos/:year/:id/",
        element: <Recursos />,
      },
      {
        path: "/user/colegios/:name_colegio/recursos/:year/:id/registrar_actividad",
        element: <RegistrarActividad />
      },
      {
        path: "/user/colegios/:name_colegio/presupuesto/:year/:id",
        element: <PresupuestoColegio />,
      },
      {
        path: "/user/gestion/:nombre_colegio/:id_colegio",
        element: <Gestion />,
        children: [
          {
            path: "/user/gestion/:nombre_colegio/:id_colegio/pme",
            element: <GestionPME />,
          },
          {
            path: "/user/gestion/:nombre_colegio/:id_colegio/presupuesto",
            element: <GestionPresupuesto />,
          },
          {
            path: "/user/gestion/:nombre_colegio/:id_colegio/modificar",
            element: <GestionColegio />,
          },
        ],
      },
      {
        path: "/user/usuarios/gestion",
        element: <GestionUsuarios />,
        children: [
          {
            path: "/user/usuarios/gestion/req",
            element: <Requerimiento />,
          },
          {
            path: "/user/usuarios/gestion/req/:codigo_req",
            element: <PDFRequerimiento />,
          },
          {
            path:"/user/usuarios/gestion/mis_requerimientos/:area",
            element: <MisRequerimientos />
          }
        ],
      },
    ],
  },

  {
    path: "/*",
    element: <NotFound_404 />,
  },
]);

export default router;
