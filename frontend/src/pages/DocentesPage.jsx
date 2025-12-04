import { CardInfo } from "@/components/CardInfo";
import { useDocentes } from "@/hooks/useDocentes";

export const DocentesPage = () => {
  const { docentes } = useDocentes();

  return (
    <section>
      <h2 className="text-3xl mb-6">Mis Docentes</h2>

      <div className="grid grid-cols-3 gap-2">
        {docentes.data?.map((docente) => (
          <CardInfo key={docente.nombre} docente={docente} />
        ))}
      </div>
    </section>
  );
};
