import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // cremaos primero el authProvider, luego el useAuth y po ultimo
  // lo agregarmos al Login Component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const {auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const {auth} = AuthProvider()
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      console.log(alerta);
      return;
    } else {
      await axios
        .post(`${import.meta.env.VITE_API}/login/auth`, {
          username: e.target.email.value,
          password: e.target.password.value,
        })
        .then((resp) => {
          console.log(resp.data);
          localStorage.setItem('token', resp.data.access_token)
          setAuth(resp.data.payload)
          navigate('/user/colegios')
        })
        .catch((err) => {
          setAlerta({
            msg: err,
            error: true,
          });
          return alerta
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-[400px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-slate-500 rounded-xl p-5"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Ingresar a la Plataforma
          </h1>
        </div>
        <div className="flex flex-col gap-2 h-44 justify-center">
          <div className="flex-col gap-3 w-12/12">
            <label htmlFor="" className="w-3/12 font-bold text-white">
              Usuario
            </label>
            <input
              type="text"
              className="mt-2 px-3 py-2 border rounded-xl w-full"
              placeholder="Correo"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex-col gap-3">
            <label htmlFor="" className="w-3/12 font-bold text-white">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-2 px-3 py-2 border rounded-xl w-full"
              placeholder="Contraseña"
              name="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
