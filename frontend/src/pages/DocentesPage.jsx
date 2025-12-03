import { useEffect, useState } from "react"
import { CardInfo } from "../components/CardInfo"
import { getAllDocentes } from "../services/institutes"

export const DocentesPage = () => {
  const [docentes, setDocentes] = useState({ data: [] });

  useEffect(() => {
    const fetchDocentes = async () => {
      const response = await getAllDocentes();
      console.log({ response })
      setDocentes(response);
    };

    fetchDocentes();
  }, []);
  

  return (
    <section>
      <h2 className="text-3xl mb-6">Mis Docentes</h2>

      <div className="grid grid-cols-3 gap-2">
        {docentes.data?.map((docente) => (
          <CardInfo key={docente.id} docente={docente} />
        ))}
      </div>
    </section>
  );
};
