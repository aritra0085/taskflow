import React, { useEffect, useState } from 'react'
import { getPriorityColor, TI_CLASSES } from '../assets/dummy'
import { CheckCircle2 } from 'lucide-react'
import axios from 'axios'

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskItem = ({task,onRefresh,onLogout,showCompleteCheckbox = true }) => {

  const [showMenu,setShowMenu] = useState(false)
  const [isCompleted, setIsCompleted] = useState(
    [true, 1, 'yes'].includes(
      typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
    )
  )
  const [showEditModal, setShowEditModal] = useState(false)
  const [subtasks, setSubtasks] = useState(task.subtasks || [])

  useEffect(() => {
    setIsCompleted(
      [true, 1, 'yes'].includes(
        typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
      )
    )
  }, [task.completed])

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No auth token found')
      return{Authorization: `Bearer ${token}`}
  }

  const borderColor = isCompleted ? "border-green-500" : getPriorityColor(task.priority).split(' ')[0]

  const handleComplete = async () => {
    const newStatus = !isCompleted ? 'Yes' : 'No'
    try {
      await axios.put(`${API_BASE}/${task._id}/gp`, {completed: newStatus}, {headers: getAuthHeaders()})
      setIsCompleted(!isCompleted)
      onRefresh()
    } catch (err) {
      console.error(err)
      if(err.response?.status === 401)onLogout?.()
    }
  }

  const progress = subtasks.length ? (subtasks.filter(st => st.completed).length / subtasks.length) * 100 : 0

  return (
       <>
         <div className={`${TI_CLASSES.wrapper} ${borderColor}`}>
              <div className={TI_CLASSES.leftContainer}>
                  {showCompleteCheckbox && (
                    <button onClick={handleComplete}
                    className={`${TI_CLASSES.completeBtn} ${isCompleted ? 'bg-green-500': 'bg-gray-300'}`}>
                      <CheckCircle2 size={18} className={`${TI_CLASSES.checkboxIconBase} ${isCompleted ? 'fill-green-500' : ''}`}/>
                    </button>
                  )}

                  <div className='flex-1 min-w-0'>
                      <div className='flex items-baseline gap-2 mb-1 flex-wrap'>  
                          <h3 className={`${TI_CLASSES.titleBase}
                            ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                              {task.title}
                            </h3>
                            <span className={`${TI_CLASSES.priorityBadge}
                              ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                            </span>
                      </div>
                  </div>
              </div>
          </div>       
       </>
  )
}

export default TaskItem
