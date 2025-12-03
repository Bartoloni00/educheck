import { Mail, Phone } from 'lucide-react';

export const CardInfo = ({ docente }) => {
  return (
    <div className="p-4 border rounded-lg">
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
