import { useAuth } from "@/hooks/useAuth";
import { AusenciaDocente } from "./components/AusenciaDocente";
import { AusenciaInstituto } from "./components/AusenciaInstituto";

export const AusenciaPage = () => {
  const { user } = useAuth();
  const isDocente = user?.rol === "docente";

  return (
    <section>
      {isDocente ? <AusenciaDocente /> : <AusenciaInstituto />}
    </section>
  );
};
