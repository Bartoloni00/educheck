import { Card } from "@/components/Card";
import { Table } from "@/components/Table";
import { CalendarWeekView } from "@/components/Calendar";
import { useDashboardInstituto } from "@/hooks/useDashboardInstituto";
import { tableColumns } from "@/utils/tableColumns";

export const DashboardInstituto = () => {
  const { registros, ausencias, docentes } = useDashboardInstituto();

  return (
    <section>
      <div className="grid grid-cols-3 gap-5 mb-8">
        <Card number={docentes.length || 0} label="Docentes Asignados" />
        <Card number={registros.length || 0} label="Registros de Hoy" />
        <Card number={ausencias.length || 0} label="Ausencias Pendientes" />
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

      <section>
        <h3 className="text-lg font-semibold my-4">Registros</h3>

        {registros.length ? (
          <Table type="registros" data={registros} columns={tableColumns} />
        ) : (
          <div className="bg-[#202225] border border-gray-800 rounded-xl p-6 h-48 flex items-center justify-center text-gray-400">
            No hay registros para hoy
          </div>
        )}
      </section>
    </section>
  );
};
