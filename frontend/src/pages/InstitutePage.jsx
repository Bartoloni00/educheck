import { useInstitutes } from "@/hooks/useInstitutes";

export const InstitutePage = () => {
  const {
    addInstitutes,
    removeInstitutes,
    formAdd,
    formRemove,
    onChangeAdd,
    onChangeRemove,
    handleAssign,
    handleRemove
  } = useInstitutes();

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-semibold mb-6">Configuración de institutos</h2>

      <div className="max-w-2xl space-y-4">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Asignar Instituto</label>
          <select
            name="institutoId"
            value={formAdd.institutoId}
            onChange={onChangeAdd}
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1378FF]"
          >
            <option value="" disabled>Seleccione un instituto</option>
            {addInstitutes.map((inst) => (
              <option key={inst._id} value={inst._id}>{inst.nombre}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAssign}
            className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 mt-2 text-white rounded"
          >
            Asignar institución
          </button>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Remover Instituto</label>
          <select
            name="institutoId"
            value={formRemove.institutoId}
            onChange={onChangeRemove}
            className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1378FF]"
          >
            <option value="" disabled>Seleccione un instituto</option>
            {removeInstitutes.map((inst) => (
              <option key={inst._id} value={inst._id}>{inst.nombre}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleRemove}
            className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 mt-2 text-white rounded"
          >
            Eliminar institución
          </button>
        </div>
      </div>
    </section>
  );
};
