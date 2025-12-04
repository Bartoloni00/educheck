import { useEffect, useState } from "react";
import { getAllNotifications } from "@/services/services.api";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState({
    data: { notificaciones: [] }
  });

  useEffect(() => {
    const loadNotificaciones = async () => {
      const response = await getAllNotifications();
      setNotifications(response);
    };

    loadNotificaciones();
  }, []);

  const list = notifications.data?.notificaciones ?? [];

  return {
    list
  };
};
