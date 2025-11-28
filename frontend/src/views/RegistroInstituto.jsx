import { useState, useEffect } from "react";
import api from "../services/api";

function RegistroInstituto() {
  const [institutos, setInstitutos] = useState([]);
  const [institutoSeleccionado, setInstitutoSeleccionado] = useState("");
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

  const handleSubmit = async (e) => {
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

  return (
    <div className="section">
      <h2>Asignar Docente a un Instituto</h2>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`}>{mensaje.texto}</div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="institutoId">Instituto</label>
          <select
            id="institutoId"
            name="institutoId"
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
    </div>
  );
}

export default RegistroInstituto;