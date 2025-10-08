import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-d border-gray-200 font-sans'>
      <div className='flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto'>
        {/* LOGO */}
        <div className='flex items-center gap-2 cursor-pointer group'
          onClick={() => navigate('/')}>
            {/* LOGO */}
            <div className='relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300'>

            </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
