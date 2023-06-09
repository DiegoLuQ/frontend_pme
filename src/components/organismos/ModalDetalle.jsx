import React from "react";
import { useState } from "react";

const ModalDetalle = ({ RecursosData, modalOn }) => {
  const [modal, setModal] = useState(modalOn);
  const closeModal = () => {
    setModal(false);
  };

  return modal ? (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="fixed inset-0 bg-black opacity-25"
        onClick={closeModal}
      ></div>
      <div className="relative w-full max-w-2xl md:max-w-4xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
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
          {/* Inputs */}
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white">
              Detalles de la Actividad
            </h3>
            <div className="space-y-2">
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Dimensión
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.dimension}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Sub Dimensión
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.subdimension}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Actividad
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.nombre_actividad}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Medios de verificación
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.medios_ver}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Area o Responsable
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.responsable}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Descripción
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.descripcion_actividad}
                </p>
              </div>
              <div>
                <label className="block text-base font-medium text-teal-400">
                  Acción PME Mineduc
                </label>
                <p className="text-white font-semi italic">
                  {RecursosData.accion.nombre_accion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalDetalle;
