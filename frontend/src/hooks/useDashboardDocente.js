import { useState, useEffect } from "react";
import api from "../services/api";

export default function useDashboardDocente() {
  const [institutos, setInstitutos] = useState([]);
  const [registrosHoy, setRegistrosHoy] = useState([]);
  const [ausencias, setAusencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [i, r, a] = await Promise.all([
        api.get("/users/institutos"),
        api.get("/registros/hoy"),
        api.get("/ausencias")
      ]);

      setInstitutos(i.data);
      setRegistrosHoy(r.data);
      setAusencias(a.data);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setCargando(false);
    }
  };

  return {
    institutos,
    registrosHoy,
    ausencias,
    cargando,
    cargarDatos,
  };
}