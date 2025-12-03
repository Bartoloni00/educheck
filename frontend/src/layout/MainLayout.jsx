import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../hooks/useAuth";

export const MainLayout = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-[#1b1c1f] text-gray-200">
      <Sidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
