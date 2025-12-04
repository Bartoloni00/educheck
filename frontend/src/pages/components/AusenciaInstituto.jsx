import { useAusenciaInstituto } from "@/hooks/useAusenciaInstituto";
import { Table } from "@/components/Table";

const tableColumns = {
  instituto: [
    { key: "docenteNombre", label: "Docente" },
    { key: "fechaFormateada", label: "Fecha" },
    { key: "motivo", label: "Motivo" },
    { key: "descripcion", label: "Descripción" },
    { key: "estado", label: "Estado" },
    { key: "acciones", label: "Acciones" },
  ],
};

export const AusenciaInstituto = () => {
  const {
    motivos,
    estados,
    filtroMotivo,
    filtroNombre,
    filtroEstado,
    setFiltroMotivo,
    setFiltroNombre,
    setFiltroEstado,
    filteredAusencias,
    onChangeEstado,
  } = useAusenciaInstituto();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Ausencias del Instituto</h2>

      {/* Filtros */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Buscar docente..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
        />

        <select
          value={filtroMotivo}
          onChange={(e) => setFiltroMotivo(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
        >
          <option value="">Todos los motivos</option>
          {motivos.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900"
        >
          <option value="">Todos los estados</option>
          {estados.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>

      <Table
        type="instituto"
        data={filteredAusencias}
        columns={tableColumns}
        onChangeEstado={onChangeEstado}
      />
    </section>
  );
};
