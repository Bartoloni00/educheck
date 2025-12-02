import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#1b1c1f] text-gray-200">
      <Sidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
