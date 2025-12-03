import { useEffect, useState } from "react";
import { getAllInstitutes } from "../services/institutes";
import { useNavigate } from "react-router-dom";
import { createAusencia } from "../services/ausencias";

const motivos = ["enfermedad", "personal", "emergencia", "otro"];

export const AusenciaPage = () => {
  const [institutes, setInstitutes] = useState({ data: [] });
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    institutoId: "",
    fechaAusencia: "",
    motivo: "",
    descripcion: ""
  });

  useEffect(() => {
    const loadInstitutes = async () => {
      const response = await getAllInstitutes();
      setInstitutes(response);
    };
    
    loadInstitutes();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await createAusencia(form);
    navigate("/");
  };

  return (
    <section>
      <h2 className="text-2xl mb-4">Reportar Ausencia</h2>

      <form className="space-y-5 max-w-[500px]" onSubmit={onSubmit}>

        {/* Instituto */}
        <div>
          <label className="text-gray-300 text-sm">Instituto donde trabaja</label>
          <select
            name="institutoId"
            value={form.institutoId}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 focus:outline-none focus:border-[#1378FF]"
          >
            <option value="" disabled>Seleccione un instituto</option>
            {institutes.data.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="fechaAusencia">Fecha de ausencia</label>
          <input
            type="date"
            name="fechaAusencia"
            id="fechaAusencia"
            value={form.fechaAusencia}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200 
              focus:outline-none focus:border-[#1378FF]"
          />
        </div>

        {/* Motivo */}
        <div>
          <label htmlFor="motivo">Motivo</label>
          <select
            name="motivo"
            id="motivo"
            value={form.motivo}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 focus:outline-none focus:border-[#1378FF]"
          >
            <option value="" disabled>Seleccione un motivo</option>
            {motivos.map((motivo) => (
              <option key={motivo} value={motivo}>
                {motivo}
              </option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={form.descripcion}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200 
              focus:outline-none focus:border-[#1378FF] resize-none"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-semibold text-white bg-[#1378FF] hover:bg-[#0e63d1] transition"
        >
          Reportar Ausencia
        </button>
      </form>
    </section>
  );
};
