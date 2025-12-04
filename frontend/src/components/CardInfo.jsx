import { Mail, Phone } from 'lucide-react';

export const CardInfo = ({ docente }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
      <h3 className="flex flex-row gap-2 text-2xl font-bold">
        {docente.nombre}
      </h3>

      <a href={`mailto:${docente.email}`} target="_blank" className="flex flex-row gap-2 my-2">
        <Mail />
        <p>{docente.email}</p>
      </a>

      <a href={`tel:${docente.telefono}`} target="_blank" className="flex flex-row gap-2">
        <Phone />
        <p>{docente.telefono}</p>
      </a>
    </div>
  );
};
