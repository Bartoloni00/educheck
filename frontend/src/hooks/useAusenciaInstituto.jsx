import { useState, useEffect } from "react";
import { getAllAusencias } from "@/services/ausencias";
import { updateAusencia } from "@/services/services.api.js";
import { formatDate } from "@/utils/formatDate";

const motivos = ["enfermedad", "personal", "emergencia", "otro"];
const estados = ["pendiente", "aceptada", "rechazada"];

export const useAusenciaInstituto = () => {
  const [ausencias, setAusencias] = useState([]);
  const [filtroMotivo, setFiltroMotivo] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await getAllAusencias();
      const lista = response.data || [];

      const formateado = lista.map((a) => ({
        ...a,
        docenteNombre: a.docente?.nombre || "-",
        fechaFormateada: formatDate(a.fechaAusencia),
      }));

      setAusencias(formateado);
    };

    load();
  }, []);

  const filteredAusencias = ausencias.filter((a) => {
    const coincideMotivo = filtroMotivo ? a.motivo === filtroMotivo : true;
    const coincideNombre = filtroNombre
      ? a.docenteNombre.toLowerCase().includes(filtroNombre.toLowerCase())
      : true;
    const estadoActual = a.estado || "sin confirmar";
    const coincideEstado = filtroEstado ? estadoActual === filtroEstado : true;
    return coincideMotivo && coincideNombre && coincideEstado;
  });

  const onChangeEstado = async (id, nuevoEstado) => {
    await updateAusencia(id, nuevoEstado);
    setAusencias((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, estado: nuevoEstado } : a
      )
    );
  };

  return {
    motivos,
    estados,
    filtroMotivo,
    filtroNombre,
    filtroEstado,
    setFiltroMotivo,
    setFiltroNombre,
    setFiltroEstado,
    filteredAusencias,
    onChangeEstado,
  };
};
