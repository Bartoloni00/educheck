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
    <>
      <div>
        <label className="text-gray-300 text-sm">Instituto donde trabaja</label>
        <select
          name="institutoId"
          value={form.institutoId}
          onChange={onChange}
          className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-[#1378FF]"
        >
          <option value="" disabled>Seleccione un instituto</option>
          {institutes.data.map((inst) => (
            <option key={inst.nombre} value={inst._id}>
              {inst.nombre}
            </option>
          ))}
        </select>
      </div>

      <menu className="flex flex-row gap-2 mb-10 mt-4">
        <button
          type="button"
          onClick={() => handleSelectType("ingreso")}
          className="py-2 px-6 cursor-pointer hover:bg-green-700 bg-green-600"
        >
          Ingreso
        </button>

        <button
          type="button"
          onClick={() => handleSelectType("salida")}
          className="py-2 px-6 cursor-pointer hover:bg-red-700 bg-red-600"
        >
          Salida
        </button>

        <button
          type="button"
          onClick={handleGenerateQR}
          disabled={!typeQR || !form.institutoId}
          className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 disabled:bg-gray-400"
        >
          Generar QR
        </button>
      </menu>

      {value && (
        <div className="flex justify-center p-4 bg-white rounded-lg w-fit">
          <QRCode value={value} />
        </div>
      )}
    </>
  );
};
