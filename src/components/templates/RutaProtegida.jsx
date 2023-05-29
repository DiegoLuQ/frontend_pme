import { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MainHeader from "../organismos/MainHeader";
import useAuth from "../../hooks/useAuth";
import AuthContext, { AuthProvider } from "../../context/AuthProvider";

const RutaProtegida = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {cerrarSession} = useAuth()
  const {auth} = useContext(AuthContext)

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <div className="w-full m-auto mb-5">
      <div className="flex ">
        <MainHeader>
          <nav className="w-full flex justify-end md:flex md:justify-end md:items-center">
            <ul className="flex ">
              <Link
                to="/admin/colegios"
                className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
              >
                Colegios
              </Link>
              <Link
                to="/admin"
                className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
              >
                {auth.usuario}
              </Link>
              <Link
                to="/"
                onClick={cerrarSession}
                className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
              >
                Salir
              </Link>
            </ul>
          </nav>
        </MainHeader>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RutaProtegida;
