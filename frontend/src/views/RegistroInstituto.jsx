import { useState, useEffect } from "react";
import "../styles/RegistroInstituto.css";
import api from "../services/api";

function RegistroInstituto() {
  const [institutos, setInstitutos] = useState([]);
  const [misInstitutos, setMisInstitutos] = useState([]);
  const [institutoSeleccionado, setInstitutoSeleccionado] = useState("");
  const [institutoDesasignar, setInstitutoDesasignar] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarInstitutos = async () => {
      try {
        const res = await api.get("/institutos");
        setInstitutos(res.data);
      } catch (error) {
        console.error("Error cargando institutos:", error);
      }
    };

    cargarInstitutos();
  }, []);

  useEffect(() => {
    const cargarMisInstitutos = async () => {
      try {
        const res = await api.get("/users/institutos");
        setMisInstitutos(res.data.institutosAsignados || []);
      } catch (error) {
        console.error("Error cargando institutos del usuario:", error);
      }
    };

    cargarMisInstitutos();
  }, []);

  const handleAsignar = async (e) => {
    e.preventDefault();
    if (!institutoSeleccionado) return;

    setCargando(true);
    setMensaje({ texto: "", tipo: "" });

    try {
      await api.post(`/institutos/${institutoSeleccionado}/asignar`);

      setMensaje({
        texto: "Asignación realizada exitosamente",
        tipo: "success",
      });

      const res = await api.get("/auth/me");
      setMisInstitutos(res.data.institutosAsignados || []);

    } catch (error) {
      console.error("Error asignando:", error);
      setMensaje({
        texto: error.response?.data?.mensaje || "Error al asignar docente",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleDesasignar = async (e) => {
    e.preventDefault();
    if (!institutoDesasignar) return;

    setCargando(true);
    setMensaje({ texto: "", tipo: "" });

    try {
      await api.post(`/institutos/${institutoDesasignar}/desasignar`);

      setMensaje({
        texto: "Se desasignó correctamente del instituto",
        tipo: "success",
      });

      // Refrescar lista del usuario
      const res = await api.get("/users/institutos");
      setMisInstitutos(res.data.institutosAsignados || []);

    } catch (error) {
      console.error("Error desasignando:", error);
      setMensaje({
        texto: error.response?.data?.mensaje || "Error al desasignar",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="section">

      <h2>Asignar Docente a un Instituto</h2>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>
      )}

      {/* FORMULARIO PARA ASIGNAR */}
      <form onSubmit={handleAsignar} className="form">
        <div className="form-group">
          <label htmlFor="institutoId">Instituto disponible</label>
          <select
            id="institutoId"
            value={institutoSeleccionado}
            onChange={(e) => setInstitutoSeleccionado(e.target.value)}
            required
          >
            <option value="">Selecciona un instituto</option>
            {institutos.map((i) => (
              <option key={i._id} value={i._id}>
                {i.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={cargando}>
          {cargando ? "Asignando..." : "Asignar Docente"}
        </button>
      </form>
    
      <section className="desasignar-section">
        <h2>Desasignar Docente de un Instituto</h2>

        <form onSubmit={handleDesasignar} className="form">
            <div className="form-group">
            <label htmlFor="institutoDesasignar">Mis institutos</label>
            <select
                id="institutoDesasignar"
                value={institutoDesasignar}
                onChange={(e) => setInstitutoDesasignar(e.target.value)}
                required
            >
                <option value="">Selecciona un instituto</option>
                {misInstitutos.length === 0 && (
                <option disabled>No estás asignado a ningún instituto</option>
                )}
                {misInstitutos.map((i) => (
                <option key={i._id} value={i._id}>
                    {i.nombre}
                </option>
                ))}
            </select>
            </div>

            <button type="submit" className="btn btn-danger" disabled={cargando}>
            {cargando ? "Desasignando..." : "Desasignar"}
            </button>
        </form>
      </section>
    </div>
  );
}

export default RegistroInstituto;
