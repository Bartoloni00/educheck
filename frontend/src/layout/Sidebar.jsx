import { Home, Users, Bell, LogOut, BookOpen } from "lucide-react";
import { NavItem } from "../components/NavItem";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#202225] border-r border-gray-800 p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-white text-center">EduCheck</h1>

      <nav className="space-y-2 flex-1">
        <NavItem icon={<Home size={18} />} label="Inicio" to="/" />
        <NavItem icon={<Users size={18} />} label="Mis Docentes" to="/docentes" />
        <NavItem icon={<BookOpen size={18} />} label="Ausencias" to="/asistence" />
        <NavItem icon={<Bell size={18} />} label="Notificaciones" to="/notifications" />
      </nav>

      <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" to="/logout" />
    </aside>
  );
};