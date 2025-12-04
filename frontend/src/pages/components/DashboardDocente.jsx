import { Card } from "@/components/Card";
import { Table } from "@/components/Table";
import { useDashboardDocente } from "@/hooks/useDashboardDocente";
import { tableColumns } from "@/utils/tableColumns";

export const DashboardDocente = () => {
  const { registros, ausencias, institutos } = useDashboardDocente();

  return (
    <section>
      <div className="grid grid-cols-3 gap-5 mb-8">
        <Card number={institutos.length || 0} label="Institutos Asignados" />
        <Card number={registros.length || 0} label="Registros de Hoy" />
        <Card number={ausencias.length || 0} label="Ausencias Pendientes" />
      </div>

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

      <section>
        <h3 className="text-lg font-semibold my-4">Ausencias</h3>

        {ausencias.length ? (
          <Table type="ausencias" data={ausencias} columns={tableColumns} />
        ) : (
          <div className="bg-[#202225] border border-gray-800 rounded-xl p-6 h-48 flex items-center justify-center text-gray-400">
            No hay ausencias registradas
          </div>
        )}
      </section>
    </section>
  );
};
