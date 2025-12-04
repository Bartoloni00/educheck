import { useAuth } from "@/hooks/useAuth";
import { DashboardDocente } from "./components/DashboardDocente";
import { DashboardInstituto } from "./components/DashboardInstituto";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Bienvenido, {user.nombre}
      </h2>

      {user.rol === "docente" ? (
        <DashboardDocente />
      ) : (
        <DashboardInstituto />
      )}
    </section>
  );
};
