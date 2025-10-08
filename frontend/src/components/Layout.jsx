import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({onLogout,user}) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar user={user} onLogout={onLogout}/>
      <Sidebar user={user} tasks={tasks}/>
    </div>
  )
}

export default Layout
