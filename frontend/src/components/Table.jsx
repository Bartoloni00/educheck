import { tableColumns } from "../utils/tableColumns";

export const Table = ({ type = "", data = [] }) => {
  const columns = tableColumns[type] || [];

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-left">
        <thead className="bg-[#1b1d1f] text-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                No hay datos
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-800 hover:bg-[#222428] transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-200">
                    {row[col.key] ?? "--"}
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
