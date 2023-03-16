import React from "react";
import { Link } from "react-router-dom";

const Loguito = () => {
  return (
    <div className="hidden md:flex md:justify-start">
      <Link to="/">
        <img
          src="https://www.colegiomacaya.cl/wp-content/uploads/2022/10/cropped-colegio-macaya-23-74x74.jpg"
          alt=""
          width="65px"
        />
      </Link>

      <Link to="/">
        <img
          src="https://www.colegiodiegoportales.cl/wp-content/uploads/2022/10/cropped-COLEGIO-DIEGO-PORTALES-71x78.jpg"
          alt=""
          width="60px"
        />
      </Link>
    </div>
  );
};

export default Loguito;
