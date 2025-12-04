import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Menu } from "lucide-react";

export const MainLayout = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1b1c1f] text-gray-200">

      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1b1c1f] flex items-center px-4 z-40">
        {!open && (
          <button onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
        )}
      </header>

      <Sidebar open={open} setOpen={setOpen} />

      <main
        className={`
          p-8 pt-20 transition-all duration-300
          ${open ? "lg:ml-64" : "lg:ml-0"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};
