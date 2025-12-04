import { Home, Users, Bell, LogOut, Book, BookCheck, X } from "lucide-react";
import { NavItem } from "@/components/NavItem";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Sidebar = ({ open, setOpen }) => {
  const { user, logout } = useAuth();
  const role = user?.rol;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: open ? 0 : -260 }}
        transition={{ type: "tween", duration: 0.25 }}
        className="
          fixed top-0 left-0
          h-full w-64
          bg-white
          border-r border-gray-300
          p-5 flex flex-col
          z-50
        "
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        <h1 className="text-xl font-bold mb-6 text-gray-900 text-center">EduCheck</h1>

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
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition 
            bg-[#e5e7eb] text-gray-900 hover:text-gray-700 hover:bg-[#d1d5db]"
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </motion.aside>
    </>
  );
};
