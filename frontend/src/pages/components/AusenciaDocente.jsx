import { useAusenciaDocente } from "@/hooks/useAusenciaDocente";

const motivos = ["enfermedad", "personal", "emergencia", "otro"];

export const AusenciaDocente = () => {
  const { institutes, form, onChange, onSubmit } = useAusenciaDocente();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Reportar Ausencia</h2>

      <form className="space-y-5 max-w-[500px]" onSubmit={onSubmit}>
        <div>
          <label className="text-gray-700 text-sm">Instituto donde trabaja</label>
          <select
            name="institutoId"
            value={form.institutoId}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1378FF]"
          >
            <option value="" disabled>Seleccione un instituto</option>
            {institutes.data.map((inst) => (
              <option key={inst._id} value={inst._id}>{inst.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="fechaAusencia" className="text-gray-700 text-sm">Fecha de ausencia</label>
          <input
            type="date"
            name="fechaAusencia"
            id="fechaAusencia"
            value={form.fechaAusencia}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1378FF]"
          />
        </div>

        <div>
          <label htmlFor="motivo" className="text-gray-700 text-sm">Motivo</label>
          <select
            name="motivo"
            id="motivo"
            value={form.motivo}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1378FF]"
          >
            <option value="" disabled>Seleccione un motivo</option>
            {motivos.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="descripcion" className="text-gray-700 text-sm">Descripción</label>
          <textarea
            name="descripcion"
            id="descripcion"
            value={form.descripcion}
            onChange={onChange}
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 resize-none focus:outline-none focus:border-[#1378FF]"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-semibold text-white bg-[#1378FF] hover:bg-[#0f64d3]"
        >
          Reportar Ausencia
        </button>
      </form>
    </section>
  );
};
