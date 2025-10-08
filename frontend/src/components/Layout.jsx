import React, {useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const Layout = ({onLogout,user}) => {

  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token')
      if(!token) throw new Error('No auth token found')

      const {data} = await axios.get("http://localhost:4000/api/tasks/gp",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const arr = Array.isArray(data) ? data :
           Array.isArray(data?.tasks) ? data.tasks :
                Array.isArray(data?.data) ? data.data : []
      setTasks(arr)        
    } catch (err) {    
        console.error(err);
        setError(err.message || 'Could not load tasks.')
        if(err.response?.status === 401) onLogout()
    } finally {
        setLoading(false)
      }
  }, [onLogout])
  
  useEffect(() => { fetchTasks()}, [fetchTasks])

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t =>
      t.completed === true ||
      t.completed === 1 ||
      (typeof t.completed === 'string' && t.completed.toLowerCase() === 'yes')
    ).length

    const totalCount = tasks.length
    const pendingCount = totalCount - completedTasks
    const completionPercentage = totalCount ?
      Math.round((completedTasks / totalCount) * 100) : 0

    return {totalCount,
            completedTasks,
            pendingCount,
            completionPercentage
          }
  }, [tasks])

//STATISTICS CARD
const StatCard = ({title, value, icon}) => (
  <div className='p-2 sm:p-3 rounded-xl bg-white shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300 hover:border-purple-100 group'>
    <div className='flex items-center gap-2'>
      <div className='p-1.5 rounded-lg bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 group-hover:from-fuchsia-500/20 group-hover:to-purple-500/20 transition-colors duration-300'>
        {icon}
      </div>
      <div className='min-w-0'>
          <p className='text-lg sm:text-xl font-bold bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent'>
            {value}
          </p>
          <p className='text-xs text-gray-500 font-medium'>{title}</p>
      </div>
    </div>
  </div>
)

  //Loading

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar user={user} onLogout={onLogout}/>
      <Sidebar user={user} tasks={tasks}/>

      <div className='ml-0 xl:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300'>
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6'>
               <div className='xl:col-span-2 space-y-3 sm:space-y-4'>
                    <Outlet context={{tasks, refreshTasks: fetchTasks }}/>
               </div>
          </div>
      </div>
    </div>
  )
}

export default Layout
