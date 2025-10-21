import { Dice1, ListCheck } from 'lucide-react'
import React from 'react'
import { layoutClasses } from '../assets/dummy'

const PendingPage = () => {
  return (
    <div className={layoutClasses.container}>
      <div className={layoutClasses.headerWrapper}>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2'>
            <ListCheck className='text-purple-500'/> Pending Tasks
          </h1>
        </div>
      </div>
    </div>
  )
}

export default PendingPage
