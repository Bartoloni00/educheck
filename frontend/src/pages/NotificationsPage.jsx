import { NotificationCard } from "../components/NotificationCard";

export const NotificationsPage = () => {
  return (
    <section className="flex flex-col space-y-4">
      <h2 className="text-2xl mb-6">Notificaciones</h2>

      <NotificationCard
        color="red"
        title="Ausencia registrada"
        message="El instituto registró una ausencia en tu nombre."
        date="7/11/2025 - 10:45hs"
      />

      <NotificationCard
        color="green"
        title="Asistencia confirmada"
        message="Tu asistencia fue registrada correctamente."
        date="7/11/2025 - 09:12hs"
      />

      <NotificationCard
        color="yellow"
        title="Advertencia del instituto"
        message="Tienes una advertencia pendiente de revisar."
        date="6/11/2025 - 15:22hs"
      />

      <NotificationCard
        color="blue"
        title="Nuevo mensaje"
        message="Recibiste un nuevo comunicado del instituto."
        date="5/11/2025 - 08:10hs"
      />
    </section>
  );
};
