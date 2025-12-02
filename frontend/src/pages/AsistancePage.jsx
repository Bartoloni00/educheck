import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import QRCode from "react-qr-code";

export const AsistancePage = () => {
  const { user } = useAuth();
  const [typeQR, setTypeQR] = useState("");
  const [value, setValue] = useState("");

  const handleSelectType = (type) => {
    setTypeQR(type);
  };

  const handleGenerateQR = () => {
    const now = new Date();

    const templateString = `
      Email: ${user.email}
      Tipo: ${typeQR}
      Fecha: ${now.toLocaleDateString()}
      Hora: ${now.toLocaleTimeString()}
    `;

    setValue(templateString);
  };

  return (
    <>
      <menu className="flex flex-row gap-2 mb-10">
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
          disabled={!typeQR}
          className="py-2 px-6 cursor-pointer hover:bg-sky-700 bg-sky-600 disabled:bg-gray-400"
        >
          Generar QR
        </button>
      </menu>

      {value && <QRCode value={value} />}
    </>
  );
};
