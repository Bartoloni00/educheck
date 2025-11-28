import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useDashboardDocente from "../../hooks/useDashboardDocente";

import InicioDocente from "../../views/InicioDocente";
import RegistroAsistencia from "../Registros/RegistroAsistencia";
import FormularioAusencia from "../Ausencias/FormularioAusencias";
import ListaNotificaciones from "../Notificaciones/ListaNotificaciones";

function DashboardDocente() {
  const { usuario, logout } = useAuth();
  const [vista, setVista] = useState("inicio");

  const {
    institutos,
    registrosHoy,
    ausencias,
    cargando,
    cargarDatos,
  } = useDashboardDocente();

  if (cargando) return <p>Cargando...</p>;

  const vistas = {
    inicio: (
      <InicioDocente
        usuario={usuario}
        institutos={institutos}
        registrosHoy={registrosHoy}
        ausencias={ausencias}
      />
    ),
    registros: <RegistroAsistencia institutos={institutos} onRegistroCreado={cargarDatos} />,
    ausencias: <FormularioAusencia institutos={institutos} onAusenciaCreada={cargarDatos} />,
    notificaciones: <ListaNotificaciones />,
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>EduCheck</h1>
          <p className="user-info">{usuario?.nombre}</p>
          <span className="badge-rol">Docente</span>
        </div>

        <ul className="menu">
          {Object.keys(vistas).map(key => (
            <li
              key={key}
              className={vista === key ? "active" : ""}
              onClick={() => setVista(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </li>
          ))}
        </ul>

        <button onClick={logout} className="btn btn-logout">Cerrar Sesión</button>
      </nav>

      <main className="main-content">{vistas[vista]}</main>
    </div>
  );
}

export default DashboardDocente;