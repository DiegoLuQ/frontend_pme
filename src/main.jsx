import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "../src/router/Router";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { AddItemProvider } from "./context/ReqProvider";
import { ColegioProvider } from "./context/ColegioProvider";
import { ReqGestionProvider } from "./context/ReqGestionProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ColegioProvider>
      <AddItemProvider>
        <ReqGestionProvider>
          <RouterProvider router={router} />
        </ReqGestionProvider>
      </AddItemProvider>
    </ColegioProvider>
  </AuthProvider>
);
