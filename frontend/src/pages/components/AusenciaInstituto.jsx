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
    <>
      <h2 className="text-2xl mb-4">Ausencias del Instituto</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar docente..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
        />

        <select
          value={filtroMotivo}
          onChange={(e) => setFiltroMotivo(e.target.value)}
          className="px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
        >
          <option value="">Todos los motivos</option>
          {motivos.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
        >
          <option value="">Todos los estados</option>
          {estados.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <Table
        type="instituto"
        data={filteredAusencias}
        columns={tableColumns}
        onChangeEstado={onChangeEstado}
      />
    </>
  );
};
