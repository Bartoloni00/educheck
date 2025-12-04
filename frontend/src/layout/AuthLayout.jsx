import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f3f4f6] text-gray-800">
      <main className='px-4'>
        <Outlet />
      </main>
    </div>
  )
}
