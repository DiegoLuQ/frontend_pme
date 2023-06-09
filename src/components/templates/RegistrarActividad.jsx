import React, { useEffect, useState } from "react";

const RegistrarActividad = () => {
  const [recursos, setRecursos] = useState([]);
  const [newRecurso, setNuevoRecurso] = useState("");
  const [btnOn, setBtnOn] = useState({}); //

  const handleAddItem = () => {
    if (newRecurso.trim() !== "") {
      recursos.push(newRecurso);
      setNuevoRecurso("");
    }
  };

  const handleDeleteRecursoIndex = (index) => {
    console.log(index);
    if (index >= 0) {
      const updateDataRecursos = { ...recursos };
      recursos.splice(index, 1);
      setRecursos(updateDataRecursos);
    }
  };
  const handleInputChangeNewRecurso = (e) => {
    const recurso_nuevo = e.target.value.toLowerCase();
    console.log(recurso_nuevo);
    if (e.target.value !== "") {
      setBtnOn({
        ok: false,
        msg: "",
      });
    }
    if (recursos.length > 0) {
      if (recursos.includes(recurso_nuevo)) {
        setBtnOn({
          ok: true,
          msg: "El recurso ya existe",
          class: "text-red-500 font-semibold text-base text-center",
        });
      } else {
        setNuevoRecurso(e.target.value.toLowerCase());
      }
    } else {
      setNuevoRecurso(e.target.value.toLowerCase());
    }
  };
  return (
    <div className="w-full">
      <div className="relative  m-auto max-w-2xl md:max-w-4xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700 bg-gray-700">
          {/* Inputs */}
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-white">
              Modificar recursos de la actividad
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Actividad
                </label>
                <input
                  name="actividad"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="actividad"
                  defaultValue="{RecursosData.nombre_actividad}"
                  required
                />
              </div>
              <div>
                <div className="">
                  <label className="block mb-2 text-sm font-medium text-white">
                    Nuevo recurso
                  </label>
                  <div className="">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        name="newrecurso"
                        placeholder="Nuevo Recurso"
                        onChange={handleInputChangeNewRecurso}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddItem()}
                        disabled={btnOn.ok}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Agregar
                      </button>
                    </div>
                    <p className={btnOn.class}>{btnOn.msg}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-6 gap-2 mt-5">
                  {recursos.length > 0 ? (
                    <>
                      {" "}
                      {recursos.map((item, index) => (
                        <ol
                          key={index}
                          className="relative flex items-center  justify-center text-white p-3 text-center rounded-lg ring-1 ring-pink-500"
                        >
                          <button
                            type="button"
                            onClick={() => handleDeleteRecursoIndex(index)}
                            className="absolute top-1 right-1 text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-400 rounded-lg text-sm p-1 ml-auto inline-flex items-center dark:hover:bg-pink-500 dark:hover:text-white"
                          >
                            <svg
                              aria-hidden="true"
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                          {item}
                        </ol>
                      ))}{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <p className="text-white">Aquí no hay nada</p>{" "}
                    </>
                  )}
                </ul>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Modificar Recursos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarActividad;
