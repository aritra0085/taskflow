import React,{useCallback, useEffect, useState} from 'react'
import { DEFAULT_TASK } from '../assets/dummy'
import { PlusCircle, Save, X } from 'lucide-react'

const API_BASE = 'http://localhost:4000/api/tasks'

const TaskModal = ({isOpen, onClose, taskToEdit, onSave, onLogout}) => {

    const [taskData, setTaskData] = useState(DEFAULT_TASK)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        if(!isOpen) return;
        if(taskToEdit){
            const normalized = taskToEdit.completed ==='yes' || taskToEdit.completed === true ? 'Yes' :  'No';
            setTaskData({
                ...DEFAULT_TASK,
                title: taskToEdit.title || '',
                description: taskToEdit.description || '',
                priority: taskToEdit.priority || 'Low',
                dueDate: taskToEdit.dueDate?.split('T')[0] || '',
                completed: normalized,
                id: taskToEdit._id,
            });
        }
        else {
            setTaskData(DEFAULT_TASK)
        }
        setError(null)
    }, [isOpen, taskToEdit])

    const handleChange = useCallback((e) => {
      const {name, value} = e.target;
      setTaskData(prev => ({...prev,[name]: value}))
    }, [])

    const getHeaders = useCallback(() => {
      const token = localStorage.getItem('token');
      if(!token) throw new Error('No auth token found')
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }, [])

    const handleSubmit = useCallback(async (e) => {
      e.preventDefault();
      if(taskData.dueDate < today) {
        setError('Due date cannot be in the past.');
        return;
      }
      setLoading(true)
      setError(null)

      try {
           const isEdit = Boolean(taskData.id);
           const url = isEdit ? `${API_BASE}/${taskData.id}/gp` : `${API_BASE}/gp`;
           const resp = await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: getHeaders(),
            body: JSON.stringify(taskData),
           });
            if(!resp.ok){
              if(resp.status ===401) return onLogout?.();
              const err = await resp.json();
              throw new Error(err.message || 'Failed to save task')
            }
            const saved = await resp.json();
            onSave?.(saved);
            onClose?.();
      }
       catch (err) {
            console.error(err)
            setError(err.message || 'An unexpected error occurred');
      }
      finally {
        setLoading(false)
      }
    },[taskData, getHeaders, onSave, onClose, onLogout])

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4'>
      <div className='bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg relative p-6 animate-fadeIn'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                {taskData.id ? <Save className='text-purple-500 w-5 h-5'/> :
                <PlusCircle className=' text-purple-500 w-5 h-5'/>}
                {taskData.id ? 'Edit Task' : 'Create New Task'}
            </h2>

            <button onClick={onClose} className='p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-500 hover:text-purple-700'>
                    <X className='w-5 h-5'/>
            </button>
          </div>
          {/* FORM TO FILL TO CREATE A TASK*/}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && <div className='text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100'>{error}</div>}
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                     Task Title
                   </label>
            </div>
          </form>
      </div>
    </div>
  )
}

export default TaskModal
