import QRCode from "react-qr-code";
import { useAsistance } from "../hooks/useAsistence";

export const AsistancePage = () => {
  const {
    typeQR,
    value,
    institutes,
    form,
    onChange,
    handleSelectType,
    handleGenerateQR
  } = useAsistance();

  return (
    <section className="space-y-6">
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

      <menu className="flex flex-row gap-2">
        <button
          type="button"
          onClick={() => handleSelectType("ingreso")}
          className="py-2 px-6 cursor-pointer hover:bg-green-700 bg-green-600 text-white rounded"
        >
          Ingreso
        </button>

        <button
          type="button"
          onClick={() => handleSelectType("salida")}
          className="py-2 px-6 cursor-pointer hover:bg-red-700 bg-red-600 text-white rounded"
        >
          Salida
        </button>

        <button
          type="button"
          onClick={handleGenerateQR}
          disabled={!typeQR || !form.institutoId}
          className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 disabled:bg-gray-400 text-white rounded"
        >
          Generar QR
        </button>
      </menu>

      {value && (
        <div className="flex justify-center p-4 bg-white rounded-lg w-fit">
          <QRCode value={value} />
        </div>
      )}
    </section>
  );
};
