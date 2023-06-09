import { useEffect, useState } from "react";

const AccionPDF = ({ accion }) => {
  const [actividadText, setActividadText] = useState('');
  const words = (!accion ? window.location.href = '/' : accion.actividad.split(' '))
  useEffect(() => {
    if(words.length > 20) {
      const limitedWords = words.slice(0, 20)
      const limitedText = limitedWords.join(' ')
      setActividadText(limitedText)
    } else {
      setActividadText(accion.actividad)
    }
  }, [])
  return (
    <div className="col-span-4 h-min-[150px] border rounded-lg">
      <div className="grid p-2">
        <div>
          <div className="grid grid-cols-12 gap-2">
            <label className="col-span-4 p-1 text-left text-sm">Acción</label>
            <p className="col-span-8 pl-2 text-sm">{accion ? accion.accion : "" }</p>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <label className="col-span-4 p-1 text-left text-sm">
              Dimensión
            </label>
            <p className="col-span-8 pl-2 text-sm">{accion ? accion.dimension : ""}</p>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <label className="col-span-4 p-1 text-left text-sm">
              SubDimensión
            </label>
            <p className="col-span-8 pl-2 text-sm">{accion ? accion.subdimension : ""}</p>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <label className="col-span-4 p-1 text-left text-sm">
              Actividad
            </label>
            <p className="col-span-8 pl-2 text-sm">{words.length > 20 ? actividadText + '...' : accion && accion.actividad}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccionPDF;
