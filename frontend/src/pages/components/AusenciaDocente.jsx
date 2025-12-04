import { useAusenciaDocente } from "@/hooks/useAusenciaDocente";

const motivos = ["enfermedad", "personal", "emergencia", "otro"];

export const AusenciaDocente = () => {
  const { institutes, form, onChange, onSubmit } = useAusenciaDocente();

  return (
    <>
      <h2 className="text-2xl mb-4">Reportar Ausencia</h2>

      <form className="space-y-5 max-w-[500px]" onSubmit={onSubmit}>
        <div>
          <label className="text-gray-300 text-sm">Instituto donde trabaja</label>
          <select
            name="institutoId"
            value={form.institutoId}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
          >
            <option value="" disabled>Seleccione un instituto</option>
            {institutes.data.map((inst) => (
              <option key={inst._id} value={inst._id}>
                {inst.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fechaAusencia">Fecha de ausencia</label>
          <input
            type="date"
            name="fechaAusencia"
            id="fechaAusencia"
            value={form.fechaAusencia}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
          />
        </div>

        <div>
          <label htmlFor="motivo">Motivo</label>
          <select
            name="motivo"
            id="motivo"
            value={form.motivo}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
          >
            <option value="" disabled>Seleccione un motivo</option>
            {motivos.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={form.descripcion}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200 resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-semibold text-white bg-[#1378FF]"
        >
          Reportar Ausencia
        </button>
      </form>
    </>
  );
};
