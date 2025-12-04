import { formatDate } from "../utils/formatDate";

export const Table = ({ data = [], columns = {}, type, onChangeEstado }) => {
  const cols = columns[type] || [];

  // Componente para mostrar el estado con colores
  function EstadoBadge({ estado }) {
    let color = "bg-gray-300 text-gray-900";
    let text = estado || "sin confirmar";

    if (estado === "aceptada") {
      color = "bg-green-100 text-green-800";
    } else if (estado === "rechazada") {
      color = "bg-red-100 text-red-800";
    } else if (estado === "pendiente") {
      color = "bg-yellow-100 text-yellow-800";
    }

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {text}
      </span>
    );
  }

  function renderCell(row, key) {
    if (key === "fecha") {
      const date = new Date(row.createdAt);
      return formatDate(date);
    }

    if (key === "fechaAusencia") {
      const date = new Date(row.fechaAusencia);
      return formatDate(date);
    }

    if (key === "tipo") {
      return row.tipo === "entrada" ? "Entrada" : "Salida";
    }

    if (key === "instituto") {
      return row.instituto?.nombre || "";
    }

    const value = row[key];
    return value ?? "";
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
      <table className="min-w-full text-sm text-gray-900">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            {cols.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold text-gray-900"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={cols.length}
                className="text-center py-6 text-gray-500"
              >
                No hay resultados.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {cols.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.key === "estado" ? (
                      <EstadoBadge estado={row.estado} />
                    ) : col.key === "acciones" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            onChangeEstado?.(row._id, "aceptada")
                          }
                          className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 rounded text-green-800"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() =>
                            onChangeEstado?.(row._id, "rechazada")
                          }
                          className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded text-red-800"
                        >
                          Rechazar
                        </button>
                      </div>
                    ) : (
                      renderCell(row, col.key)
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
