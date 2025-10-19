import React, { useState } from 'react'
import { TI_CLASSES } from '../assets/dummy'

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskItem = ({task,onRefresh,onLogout,showCompleteCheckbox = true }) => {

  const [showMenu,setShowMenu] = useState(false)
  const [isCompleted, setIsCompleted] = useState(
    [true, 1, 'yes'].includes(
      typeof task.completed === 'string' ? task.completed.toLowerCase() : task.completed
    )
  )

  return (
       <>
         <div className={`${TI_CLASSES.wrapper} ${borderColor}`}>
          
          </div>       
       </>
  )
}

export default TaskItem
