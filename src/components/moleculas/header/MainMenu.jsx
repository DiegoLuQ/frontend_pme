import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <nav className="w-full flex justify-center md:flex md:justify-end md:items-center">
      <ul className="flex ">
        <Link
          to="/"
          className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
        >
          Inicio
        </Link>
        <Link
          to="/colegios"
          className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white"
        >
          Colegios
        </Link>
        <Link
          to="/colegios"
          className="bg-teal-700 hover:bg-teal-600 px-4 py-5 text-white "
        >
          Gestión
        </Link>
      </ul>
    </nav>
  );
};

export default MainMenu;
