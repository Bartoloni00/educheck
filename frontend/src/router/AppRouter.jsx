import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layout/MainLayout'
import { Dashboard } from '../pages/HomePage'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { AuthLayout } from '../layout/AuthLayout'
import { AsistancePage } from '../pages/AsistancePage'
import { NotificationsPage } from '../pages/NotificationsPage'
import { DocentesPage } from '../pages/DocentesPage'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Navigate to={"/auth/login"} />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/register' element={<RegisterPage />} />
      </Route>
      
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/docentes' element={<DocentesPage />} />
        <Route path='/asistence' element={<AsistancePage />} />
        <Route path='/notifications' element={<NotificationsPage />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/auth/login" />}/>
    </Routes>
  )
}
