import React, { useMemo, useState } from 'react'
import { ADD_BUTTON, HEADER, ICON_WRAPPER, STAT_CARD, STATS, STATS_GRID, VALUE_CLASS, WRAPPER } from '../assets/dummy'
import { HomeIcon, Icon, Plus } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
const API_BASE = 'http://localhost:4000/api/tasks'

const Dashboard = () => {

  const {tasks,refreshTasks} = useOutletContext()
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [filter,setFilter] = useState('all')
  const stats = useMemo(() => ({
    total: tasks.length,
    lowPriority: tasks.filter(t => t.priority === toLowerCase() === 'low').length,
    mediumPriority: tasks.filter(t => t.priority === toLowerCase() === 'medium').length,
    highPriority: tasks.filter(t => t.priority === toLowerCase() === 'high').length,
    completed: tasks.filter(t => t.completed === true || t.completed === 1 || (typeof t.completed === 'string' && t.completed.toLowerCase() === 'yes')
      .length)
  }), [tasks])

  //FILTER TASKS

  return (
    <div className={WRAPPER}>
        {/* HEADER */}
        <div className={HEADER}>
            <div className='min-w-0'>
                <h1 className='text-xl md:text-3xl font-bold text-gray-800 flex items-center gap-2'>
                  <HomeIcon className='text-purple-500 w-5 h-5 md:w-6 md:h-6 shrink-0'/>
                  <span className='trancute'>Task Overview</span>
                </h1>
                <p className='text-sm text-gray-500 mt-1 ml-7 trancuate'>Manage your tasks efficiently</p>
            </div>
            <button onClick={() => setShowModal(true)} className={ADD_BUTTON}>
              <Plus size={18} />
              Add New Task
            </button>
        </div>

        {/* STATS */}
        <div className={STATS_GRID}>
            {STATS.map(({
              key,label,icon:Icon,iconColor,borderColor = "border-purple-100",valueKey,textColor,gradient
            }) => (
              <div key={key} className={`${STAT_CARD} ${borderColor}`}>
                  <div className='flex items-center gap-2 md:gap-3'>
                      <div className={`${ICON_WRAPPER} ${iconColor}`}>
                          <Icon className='w-4 h-4 md:w-5 md:h-5'/>
                      </div>

                      <div className='min-w-0'>
                        <p className={`${VALUE_CLASS} ${gradient ?
                          "bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent"
                          : textColor}`}>
                            {stats[valueKey]}
                        </p>
                      </div>
                  </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Dashboard
