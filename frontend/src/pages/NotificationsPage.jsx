import { NotificationCard } from "@/components/NotificationCard";
import { useNotifications } from "@/hooks/useNotifications";

export const NotificationsPage = () => {
  const { list } = useNotifications();

  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-2xl mb-6">Notificaciones</h2>

      {list.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md h-48 flex items-center justify-center text-gray-400">
          No hay notificaciones
        </div>
      )}

      {list.map((notificacion) => (
        <NotificationCard
          key={notificacion._id}
          color={notificacion.tipo}
          title={notificacion.titulo}
          message={notificacion.mensaje}
          date={notificacion.updatedAt}
        />
      ))}
    </section>
  );
};
