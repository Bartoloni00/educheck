export default function InicioDocente({ usuario, institutos, registrosHoy, ausencias }) {
  return (
    <div className="inicio-content">
      <h2>Bienvenido, {usuario?.nombre}</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{institutos.length}</h3>
          <p>Institutos Asignados</p>
        </div>

        <div className="stat-card">
          <h3>{registrosHoy.length}</h3>
          <p>Registros Hoy</p>
        </div>

        <div className="stat-card">
          <h3>{ausencias.filter(a => a.estado === "pendiente").length}</h3>
          <p>Ausencias Pendientes</p>
        </div>
      </div>

      <div className="section">
        <h3>Registros de Hoy</h3>
        {registrosHoy.length === 0 ? (
          <p className="empty-message">No hay registros para hoy</p>
        ) : (
          registrosHoy.map(reg => (
            <div key={reg._id} className="registro-item">
              <span className={`badge ${reg.tipo}`}>
                {reg.tipo === "entrada" ? "⬇️" : "⬆️"} {reg.tipo.toUpperCase()}
              </span>
              <span>{reg.instituto?.nombre}</span>
              <span>{new Date(reg.fecha).toLocaleTimeString("es-AR")}</span>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <h3>Ausencias Recientes</h3>
        {ausencias.length === 0 ? (
          <p className="empty-message">No hay ausencias registradas</p>
        ) : (
          ausencias.slice(0, 5).map(a => (
            <div key={a._id} className="ausencia-item">
              <div>
                <strong>{a.instituto?.nombre}</strong>
                <p>{new Date(a.fechaAusencia).toLocaleDateString("es-AR")}</p>
              </div>
              <span className={`badge ${a.estado}`}>{a.estado}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}