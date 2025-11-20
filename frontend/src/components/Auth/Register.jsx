// Archivo: client/src/components/Auth/Register.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

function Register() {
  // Estado de institutos (ANTES LO TENIAS FUERA -> ERROR)
  const [institutos, setInstitutos] = useState([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "docente",
    telefono: "",
    institutoId: "", // deja el nombre que vos usás actualmente
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // 🔥 Cargar institutos correctamente
  useEffect(() => {
    const fetchInstitutos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/institutos");
        const data = await res.json();
        setInstitutos(data);
      } catch (error) {
        console.error("Error cargando institutos:", error);
      }
    };

    fetchInstitutos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setCargando(true);

    const { confirmPassword, ...datosRegistro } = formData;
    const resultado = await register(datosRegistro);

    if (resultado.success) {
      navigate("/");
    } else {
      setError(resultado.error);
    }

    setCargando(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>EduCheck</h1>
          <h2>Crear Cuenta</h2>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Juan Pérez"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rol">Tipo de Cuenta</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="docente">Docente</option>
              <option value="instituto">Instituto</option>
            </select>
          </div>

          {formData.rol === "docente" && (
            <div className="form-group">
              <label htmlFor="institutoId">Instituto donde trabaja</label>
              <select
                id="institutoId"
                name="institutoId"
                value={formData.institutoId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un instituto</option>

                {institutos.map((ins) => (
                  <option key={ins._id} value={ins._id}>
                    {ins.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
