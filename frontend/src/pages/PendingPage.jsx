import { ListCheck } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { layoutClasses } from '../assets/dummy'
import {useOutletContext} from 'react-router-dom'

const API_BASE = 'http://localhost:4000/api/tasks'

const PendingPage = () => {

  const {tasks = [], refreshTasks} = useOutletContext();
  const [sortBy,setSortBy] = useState('newest')
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const getHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No auth token found')
      return {'Content-Type':'application/json',Authorization: `Bearer ${token}`}
  }

  const sortedPendingTasks = useMemo(() => {
    const filtered = tasks.filter(
      (t) => !t.completed || (typeof t.completed === 'string' && t.completed.toLowerCase() === 'no')
    )
    return filtered.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      const order = {high: 3, medium: 2, low: 1};
      return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()]
    })
  }, [tasks, sortBy])

  return (
    <div className={layoutClasses.container}>
      <div className={layoutClasses.headerWrapper}>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2'>
            <ListCheck className='text-purple-500'/> Pending Tasks
          </h1>
          <p className='text-sm text-gray-500 mt-1 ml-7'>
            
          </p>
        </div>
      </div>
    </div>
  )
}

export default PendingPage
