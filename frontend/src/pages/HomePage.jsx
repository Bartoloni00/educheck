import {CalendarWeekView} from "../components/Calendar";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { useAuth } from "../hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();

  const isDocente = user.role === "docente";
  const isInstituto = user.role === "instituto";

  const data1 = [
    {
      instituto: "Normal 27",
      entrada: "08:00",
      salida: "12:00",
      turno: "Mañana",
      fecha: "2024-01-01",
    },
  ];

  const data2 = [
    {
      instituto: "Normal 27",
      fecha: "2024-01-03",
      motivo: "Enfermedad",
      turno: "Tarde",
    },
  ];

  
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Bienvenido, {user.userName || "desconocido"}
      </h2>

      {/* Estadisticas Generales */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {isDocente && <Card number={1} label="Institutos Asignados" />}
        {isInstituto && <Card number={1} label="Docentes Asignados" />}
        <Card number={0} label="Registros de Hoy" />
        <Card number={0} label="Ausencias Pendientes" />
      </div>

      <section>
        <h3 className="text-lg font-semibold my-2">Actividad de Hoy</h3>

        <CalendarWeekView
        events={[
          { date: "2025-01-01", start: "09:00", end: "10:00", title: "Reunión de equipo", color: "bg-indigo-700/60" },
          { date: "2025-01-02", start: "14:00", end: "15:30", title: "Desarrollo frontend", color: "bg-emerald-700/60" },
          { date: "2025-01-03", start: "11:00", end: "12:00", title: "Llamada con cliente", color: "bg-rose-700/60" }
        ]}  
        />
      </section>

      {/* Registros */}
      <section>
        <h3 className="text-lg font-semibold my-2">Registros</h3>

        {data1.length > 0 ? (
          <Table type="registros" data={data1} />
        ) : (
          <div className="bg-[#202225] border border-gray-800 rounded-xl p-6 h-48 flex items-center justify-center text-gray-400">
            No hay registros para hoy
          </div>
        )}
      </section>

      {/* Ausencias (solo docentes) */}
      {isDocente && (
        <section>
          <h3 className="text-lg font-semibold my-4">Ausencias</h3>

          {data2.length > 0 ? (
            <Table type="ausencias" data={data2} />
          ) : (
            <div className="bg-[#202225] border border-gray-800 rounded-xl p-6 h-48 flex items-center justify-center text-gray-400">
              No hay ausencias registradas
            </div>
          )}
        </section>
      )}
    </section>
  );
};
