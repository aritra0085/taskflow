import React, { useEffect, useState } from 'react'
import { LINK_CLASSES, menuItems, PRODUCTIVITY_CARD, SIDEBAR_CLASSES } from '../assets/dummy'
import { Sparkle } from 'lucide-react'
import { NavLink } from 'react-router-dom'
const Sidebar = ({user, tasks}) => {

  const [mobileOpen,setMobileOpen] =useState(false)
  const [showModal, setShowModal] = useState(false)

  const totalTasks = tasks?.length || 0
  const completedTasks =tasks?.filter((t) => t.completed).length || 0
  const productivity = totalTasks > 0
  ? Math.round((completedTasks/totalTasks) * 100)
  : 0

  const username = user?.name || "User"
  const initial = username.charAt(0).toUpperCase()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto"
    return() => {documents.body.style.overflow = "auto"}
  },[mobileOpen])


  const renderMenuItems = (isMobile = false) => {
    <ul className='space-y-2'>
      {menuItems.map(({text,path,icon}) => (
        <li key={text}>
          <NavLink to={path} className={({isActive}) => [
            LINK_CLASSES.base,
            isActive ? LINK_CLASSES.active : LINK_CLASSES.inactive,
            isActive ? "justify-start" : "lg:justify-start"
          ].join(" ")} onClick={() => setMobileOpen(false)}>
              <span>
                
              </span>
          </NavLink>
        </li>
      ))}
    </ul>
  }

  return (
    <>
    {/* {Desktop Sidebar} */}
    <div className={SIDEBAR_CLASSES.desktop}>
        <div className='p-5 border-b border-purple-100 lg:block hidden'>
          <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md'>
                  {initial}
              </div>

              <div>
                <h2 className='text-lg font-bold text-gray-800'>Hey,{username}</h2>
                <p className='text-sm text-purple-500 font-medium flex items-center gap-1'>
                  <Sparkle className='w-3 h-3'/>Let's crush some tasks!
                </p>
              </div>
          </div>
        </div>
        <div className='p-4 space-y-6 overflow-y-auto flex-1'>
          <div className={PRODUCTIVITY_CARD.container}>
            <div className={PRODUCTIVITY_CARD.header}>
              <h3 className={PRODUCTIVITY_CARD.label}>PRODUCTIVITY</h3>
              <span className={PRODUCTIVITY_CARD.badge}>{productivity}%</span>
            </div>
            <div className={PRODUCTIVITY_CARD.barBg}>
              <div className={PRODUCTIVITY_CARD.barFg}
                  style={{width: `${productivity}%`}}/>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar
