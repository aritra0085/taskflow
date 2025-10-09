import React, {useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import {Circle, Clock, TreadingUp, Zap} from 'lucide-react'

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
  if (loading) return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'>
        </div>
    </div>
  )

  //ERROR
  if (error) return (
    <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
        <div className='bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 max-w-md'>
          <p className='font-medium mb-2'>Error loading tasks</p>
          <p className='text-sm'>{error}</p>
            <button onClick={fetchTasks} className='mt-4 py-2 px-4 bg-red-100  text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors'>
                Try Again
            </button>
        </div>

    </div>
  )

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar user={user} onLogout={onLogout}/>
      <Sidebar user={user} tasks={tasks}/>

      <div className='ml-0 xl:ml-64 md:ml-16 pt-16 p-3 sm:p-4 md:p-4 transition-all duration-300'>
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6'>
               <div className='xl:col-span-2 space-y-3 sm:space-y-4'>
                    <Outlet context={{tasks, refreshTasks: fetchTasks }}/>
               </div>

               <div className='xl:col-span-1 space-y-4 sm:space-y-6'>
                    <div className='bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-purple-100'>
                        <h3 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2'>
                          <TreadingUp className='w-4 h-4 sm:w-5 sm:h-5 text-purple-500'/>
                          Task Statistics
                        </h3>

                        <div className='grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6'>
                            <StatCard title='Total Tasks' value={stats.totalCount} icon={< Circle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500'/>}/>
                            <StatCard title='Completed' value={stats.completedTasks} icon={< Circle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500'/>}/>
                            <StatCard title='Pending' value={stats.pendingCount} icon={< Circle className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-500'/>}/>
                            <StatCard title='Completion Rate' value={`${stats.completionPercentage}%`} icon={< Zap className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500'/>}/>
                        </div>

                        <hr className='my-3 sm:my-4 border-purple-100'/>

                        <div className='space-y-2 sm:space-y-3'>
                            <div className='flex items-center justify-between text-gray-700'>
                                <span className='text-xs sm:text-sm font-medium flex items-center gap-1.5'>
                                    <Circle className='w-2.5 h-2.5 sm:w-3 text-purple-500 fill-purple-500'/>
                                    Task Progress
                                </span>
                                <span className='text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 sm:px-2 rounded-full'>
                                   {stats.completedTasks}/{stats.totalCount}
                                </span>
                            </div>

                            <div className='realtive pt-1'>
                                <div className='flex gap-1.5 items-center'>
                                  <div className='flex-1 h-2 sm:h-3 bg-purple-100 rounded-full overflow-hidden'>
                                      <div className='h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 transition-all duration-500'
                                      style={{width: `${stats.completionPercentage}%` }}/>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-purple-100'>
                          <h3 className='text-base sm:text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2'>
                              <Clock className='w-4 h-4 sm:h-5 sm:w-5 text-purple-500'/>
                              Recent Activity
                          </h3>

                          <div className='space-y-2 sm:space-y-3'>
                              {tasks.slice(0, 3).map((task) => (
                                <div key={task._id || task.id} className='flex items-center justify-between p-2 sm:p-3 hover:bg-purple-50/50 rounded-lg transition-colors duration-200 border border-transparent hover:border-purple-100'>
                                  <div className='flex-1 min-w-0'>
                                      <p className='text-sm font-medium text-gray-700 break-words whitespace-normal'>
                                        {task.title}
                                      </p>
                                      <p className='text-xs text-gray-500 mt-0.5'>
                                          {task.createdAt ? new Data(task.createdAt).toLocaleDataString() : "no data"}
                                      </p>
                                  </div>
                                  <span className={`px-2 py-1 text-xs rounded-full shrink-0 ml-2 ${task.completed ? 'bg-green-100 text-green-700' : 'bg-fuchsia-100 text-fuchsia-700'}`}>
                                        
                                  </span>
                                </div>  
                              ))}
                          </div>
                    </div>
               </div>
          </div>
      </div>
    </div>
  )
}

export default Layout
