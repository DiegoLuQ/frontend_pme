
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const MainMenu = () => {
  const { cerrarSession } = useAuth()
  const token = localStorage.getItem('token')
  return (
    <nav className="w-full flex justify-center md:flex md:justify-end md:items-center">
      <ul className="flex bg-teal-700 ">
        <Link to="/" className="hover:bg-teal-600 px-4 py-5 text-white">
          Inicio
        </Link>
        {!token ? (
          <Link
            to="/login"
            className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
          >
            Ingresar
          </Link>
        ) : (
          <div className="py-5">
            <Link to={'/user/colegios'} className="hover:bg-teal-600 py-5 px-4 text-white">
              Colegios
            </Link>
            <Link
              onClick={cerrarSession}
              className="hover:bg-teal-600 py-5 px-4 text-white"
            >
              Salir
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default MainMenu;
