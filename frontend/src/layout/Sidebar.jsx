import { Home, Users, Bell, LogOut, Book, BookCheck } from "lucide-react";
import { NavItem } from "@/components/NavItem";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const role = user?.rol;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-[#202225] border-r border-gray-800 p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-white text-center">EduCheck</h1>

      <nav className="space-y-2 flex-1">
        <NavItem icon={<Home size={18} />} label="Inicio" to="/" />

        {role === "instituto" && (
          <NavItem icon={<Users size={18} />} label="Mis Docentes" to="/docentes" />
        )}

        {role === "docente" && (
          <>
            <NavItem icon={<BookCheck size={18} />} label="Asistencia" to="/asistence" />
            <NavItem icon={<BookCheck size={18} />} label="Instituto" to="/institute" />
          </>
        )}

        <NavItem icon={<Book size={18} />} label="Ausencias" to="/ausencia" />
        <NavItem icon={<Bell size={18} />} label="Notificaciones" to="/notifications" />
      </nav>

      <button
        onClick={handleLogout}
        className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition bg-[#2c2f33] text-white hover:text-gray-300 hover:bg-[#2a2d31]">
        <LogOut size={18} />
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  );
};