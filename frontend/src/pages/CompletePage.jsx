import React, {useMemo, useState} from 'react'
import { CT_CLASSES, SORT_OPTIONS } from '../assets/dummy'
import { CheckCircle2, Filter } from 'lucide-react'
import { useOutletContext } from 'react-router-dom';
const CompletePage = () => {

  const {tasks, refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState('newest')

  const sortedCompletedTasks = useMemo(() => {
      return tasks
        .filter(task => [true, 1, 'yes'].includes(
          typeof task.completed === 'string' ? task.completed.toLowerCase()
          : task.completed
        ))
        .sort((a, b) => {
          switch (sortBy) {
            case 'newest':
              return new Date(b.createAt) - new Date(a.createAt)
              case 'oldest':
              return new Date(a.createAt) - new Date(b.createAt)
              case 'priority': {
              const order = {high: 3, medium: 1, low: 1 };
              return order[b.priority?.toLowerCase()] - order[a.priority?.toLowerCase()]
              }
              default:
                return 0
          }
        })
  }, [tasks, sortBy])
  return (
    <div className={CT_CLASSES.page}>
      {/* HEADER */}
      <div className={CT_CLASSES.header}>
        <div className={CT_CLASSES.titleWrapper}>
          <h1 className={CT_CLASSES.title}>
            <CheckCircle2 className='text-purple-500 w-5 h-5 md:w-6 md:h-6'/>
            <span className='truncate'>Completed Tasks</span>
          </h1>

          <p className={CT_CLASSES.subtitle}>
            {sortedCompletedTasks.length} task{sortedCompletedTasks.length !== 1 && 's'} {' '}
            marked as complete
          </p>
        </div>

        {/* SORT CONTROLS */}
        <div className={CT_CLASSES.sortContainer}>
          <div className={CT_CLASSES.sortBox}>
            <div className={CT_CLASSES.filterLabel}>
              <Filter className='w-4 h-4 text-purple-500'/>
              <span className='text-xs md:text-sm'>Sort by:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletePage
