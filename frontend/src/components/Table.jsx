export const Table = ({ data = [], columns = {}, type, onChangeEstado }) => {
  const cols = columns[type] || [];

  // Badge de estado
  function EstadoBadge({ estado }) {
    let color = "bg-gray-600 text-gray-200"; // default gris
    let text = estado || "sin confirmar";

    if (estado === "aceptada") {
      color = "bg-green-600 text-white";
    } else if (estado === "rechazada") {
      color = "bg-red-600 text-white";
    }

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
        {text}
      </span>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="min-w-full text-sm text-gray-300">
        <thead className="bg-[#1b1c1f] border-b border-gray-700">
          <tr>
            {cols.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold text-gray-200"
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
                className="border-b border-gray-800 hover:bg-[#1f2023] transition"
              >
                {cols.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {/* 🔹 Badge de Estado */}
                    {col.key === "estado" ? (
                      <EstadoBadge estado={row.estado} />
                    ) : col.key === "acciones" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => onChangeEstado(row._id, "aceptada")}
                          className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 rounded text-white"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => onChangeEstado(row._id, "rechazada")}
                          className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                        >
                          Rechazar
                        </button>
                      </div>
                    ) : (
                      row[col.key]
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
