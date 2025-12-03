import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getAllInstitutes } from "../../services/institutes";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [institutes, setInstitutes] = useState([{}]);
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    rol: "",
    institute: "",
  });

  useEffect(() => {
    const institute = async() => {
      const response = await getAllInstitutes();
      setInstitutes(response);
    };
    
    institute();
  }, []);
  
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[#202225] w-full max-w-md p-8 rounded-2xl border border-gray-800 shadow-xl shadow-black/20">

        <div className="flex items-center justify-center gap-3 mb-6">
          <img 
            src="/logo.png"
            alt="EduCheck Logo" 
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-2xl font-semibold text-white">EduCheck</h1>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-gray-300 text-center">
          Crear Cuenta
        </h2>

        <form className="space-y-5" onSubmit={onSubmit}>
          
          {/* Nombre */}
          <div>
            <label className="text-gray-300 text-sm">Nombre Completo</label>
            <input
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#1378FF]"
              placeholder="Juan Pérez"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#1378FF]"
              placeholder="usuario@correo.com"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-gray-300 text-sm">Teléfono</label>
            <input
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#1378FF]"
              placeholder="Ej: 1122334455"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-gray-300 text-sm">Contraseña</label>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#1378FF]"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Tipo de cuenta */}
          <div>
            <label className="text-gray-300 text-sm">Tipo de Cuenta</label>
            <select
              name="rol"
              value={form.rol}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 focus:outline-none focus:border-[#1378FF]"
            >
              <option value="" disabled>Seleccione un tipo</option>
              <option value="docente">Docente</option>
              <option value="instituto">Instituto</option>
            </select>
          </div>

          {/* Instituto */}
          <div>
            <label className="text-gray-300 text-sm">Instituto donde trabaja</label>
            <select
              name="institute"
              value={form.institute}
              onChange={onChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg 
              text-gray-200 focus:outline-none focus:border-[#1378FF]"
            >
              <option value="" disabled>Seleccione un instituto</option>
              {institutes.data?.map((institute) => (
                <option key={institute.nombre} value={institute.nombre}>
                  {institute.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-2 rounded-lg font-semibold text-white bg-[#1378FF] hover:bg-[#0e63d1] transition"
          >
            Registrarme
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          ¿Ya tienes cuenta?
          <Link to="/auth/login" className="text-[#1378FF] hover:text-[#0e63d1] pl-1 underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
