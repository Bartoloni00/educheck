import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await login(form.email, form.password);
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
          Iniciar Sesión
        </h2>

        <form className="space-y-5" onSubmit={onSubmit}>

          {/* EMAIL */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-[#1b1c1f] border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 
              focus:outline-none focus:border-[#1378FF]"
              placeholder="usuario@correo.com"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-gray-300 text-sm">Contraseña</label>

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
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

          <button
            type="submit"
            className="cursor-pointer w-full py-2 rounded-lg font-semibold text-white bg-[#1378FF] hover:bg-[#0e63d1] transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          ¿No tienes cuenta?
          <Link
            to="/auth/register"
            className="text-[#1378FF] hover:text-[#0e63d1] pl-1 underline"
          >
            Crear cuenta
          </Link>
        </p>

      </div>
    </div>
  );
};
