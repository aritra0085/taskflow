import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Settings, Zap} from 'lucide-react'

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
              <Zap className='w-6 h-6 text-white' />
              <div className='absolute -botttom-1 -middle-1 w-3 h-3 bg-white rounded-full shadow-md animate-ping'/>
            </div>

            {/* BRAND NAME */}
            <span className='text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide'>
              TaskFlow
            </span>
        </div>

        {/* RIGHT SIDE */}
          <div className='flex items-center gap-4'>
            <button className='p-2 text-gray-600 hover:text-purple-500 transition-colors duration-300 hover:bg-purple-50 rounded-full'
              onClick={() => navigate('/profile')}>
                <Settings className='w-5 h-5'/>
            </button>
          </div>
      </div>
    </header>
  )
}

export default Navbar
