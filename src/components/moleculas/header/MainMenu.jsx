import { useState } from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const [admin, setAdmin] = useState(true);

  return (
    <nav className="w-full flex justify-center md:flex md:justify-end md:items-center">
      <ul className="flex ">
        <Link
          to="/"
          className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
        >
          Inicio
        </Link>
        {authenticated ? (
          <div className="w-full flex justify-center md:flex md:justify-end md:items-center">
            <Link className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white">
              Logout
            </Link>
            <Link 
            to="/usuarios/gestion"
            className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white">
              Area de Gestión
            </Link>
            {admin && (
              <Link
                to="/colegios"
                className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
              >
                Colegios
              </Link>
            )}
          </div>
        ) : (
          <Link
            to="/"
            className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
          >
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default MainMenu;
