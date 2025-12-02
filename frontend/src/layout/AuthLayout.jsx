import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1b1c1f] text-gray-200">
      <main className='px-4'>
        <Outlet />
      </main>
    </div>
  )
}
