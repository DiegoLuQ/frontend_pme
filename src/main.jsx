import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "../src/router/Router";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { AddItemProvider } from "./context/ReqProvider";
import { ColegioProvider } from "./context/ColegioProvider";
import { ReqGestionProvider } from "./context/ReqGestionProvider";
import { AccionesProvider } from "./context/AccionesProvider";
import { ActividadProvider } from "./context/ActividadProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ColegioProvider>
      <AccionesProvider>
        <ActividadProvider>
          <AddItemProvider>
            <ReqGestionProvider>
              <RouterProvider router={router} />
            </ReqGestionProvider>
          </AddItemProvider>
        </ActividadProvider>
      </AccionesProvider>
    </ColegioProvider>
  </AuthProvider>
);
