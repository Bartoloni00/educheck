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
      <h2 className="text-2xl font-semibold mb-6">
        Configuración de institutos
      </h2>

      <div className="max-w-2xl">
        <label className="block mb-2 font-medium">Instituto</label>

        <select
          name="institutoId"
          value={formAdd.institutoId}
          onChange={onChangeAdd}
          className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
        >
          <option value="" disabled>Seleccione un instituto</option>
          {addInstitutes.map((inst) => (
            <option key={inst._id} value={inst._id}>{inst.nombre}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAssign}
          className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 mt-4"
        >
          Asignar institución
        </button>
      </div>

      <div className="max-w-2xl">
        <label className="block mb-2 font-medium">Instituto</label>

        <select
          name="institutoId"
          value={formRemove.institutoId}
          onChange={onChangeRemove}
          className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200"
        >
          <option value="" disabled>Seleccione un instituto</option>
          {removeInstitutes.map((inst) => (
            <option key={inst._id} value={inst._id}>{inst.nombre}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleRemove}
          className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 mt-4"
        >
          Eliminar institución
        </button>
      </div>
    </section>
  );
};
