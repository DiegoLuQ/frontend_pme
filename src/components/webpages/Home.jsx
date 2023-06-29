import React, { useEffect } from "react";
import flujo from "../../assets/flujograma.jpg";
import Login from "../templates/Login";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const tokenExist = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (tokenExist) {
      // navigate('/admin')
    }
  }, [])
  return (
    <div className="max-w-[1440px] m-auto bg-slate-800 py-5">
      <div className="flex flex-col items-center">
        <p className="font-bold text-3xl md:text-5xl text-center py-4 text-transparent bg-clip-text bg-gradient-to-t from-teal-400 to-[#89f291]">
          Diagrama de Flujo 
        </p>
        <img src={flujo} alt="" width="80%" />
      </div>
      <p className="font-bold text-3xl md:text-5xl text-center  py-4 text-transparent bg-clip-text bg-gradient-to-t from-teal-400 to-[#89f291]">
        Tecnologias ocupadas v1.0.0.5
      </p>
      <div className="max-w-[900px] m-auto">
        <div className="flex flex-col md:flex  md:flex-row md:justify-around">
          <div className="md:border-r-2 md:border-r-teal-300 px-2 mt-4 md:mt-0">
            <p className="font-bold text-2xl text-teal-200 text-center">
              Diseño - Frontend
            </p>
            <div className="text-white text-center">
              <p>React</p>
              <p>JavaScript</p>
              <p>HTML</p>
              <p>CSS</p>
              <p>TailWindCSS</p>
            </div>
          </div>
          <div className="md:border-r-2 md:border-r-teal-300 px-2 mt-4 md:mt-0">
            <p className="font-bold text-2xl text-teal-200 text-center">
              Logica - Backend
            </p>
            <div className="text-white text-center">
              <p>Python</p>
              <p>Pandas</p>
              <p>FastAPI</p>
              <p>Uvicorn</p>
            </div>
          </div>
          <div className="md:border-r-2 md:border-r-teal-300 px-2 mt-4 md:mt-0">
            <p className="font-bold text-2xl text-teal-200 text-center">
              Base de Datos
            </p>
            <div className="text-white text-center">
              <p>MongoDB</p>
            </div>
          </div>
          <div className="md:border-r-2 md:border-r-teal-300 px-2 mt-4 md:mt-0">
            <p className="font-bold text-2xl text-teal-200 text-center">
              DevOps
            </p>
            <div className="text-white text-center">
              <p>Docker</p>
              <p>Docker-Compose</p>
              <p>NGINX</p>
            </div>
          </div>
          <div>
            <p className="font-bold text-2xl text-teal-200 text-center px-2 mt-4 md:mt-0">
              Cloud
            </p>
            <div className="text-white text-center">
              <p>Hetzner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
