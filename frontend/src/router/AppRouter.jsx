import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layout/MainLayout";
import { Dashboard } from "@/pages/HomePage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { AuthLayout } from "@/layout/AuthLayout";
import { AsistancePage } from "@/pages/AsistancePage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { DocentesPage } from "@/pages/DocentesPage";
import { AusenciaPage } from "@/pages/AusenciaPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { InstitutePage } from "@/pages/InstitutePage";

export const AppRouter = () => {
  return (
    <Routes>

      {/* Auth */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Privado */}
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Dashboard />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="ausencia" element={<AusenciaPage />} />

        <Route element={<PrivateRoutes roles={["docente"]} />}>
          <Route path="asistence" element={<AsistancePage />} />
          <Route path="institute" element={<InstitutePage />} />
        </Route>

        <Route element={<PrivateRoutes roles={["instituto"]} />}>
          <Route path="docentes" element={<DocentesPage />} />
        </Route>

      </Route>

      <Route path="*" element={<Navigate to="/auth/login" />} />

    </Routes>
  );
};
