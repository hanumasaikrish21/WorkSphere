import React from 'react'

// Utility function to generate a random color from Tailwind's bg-500 color palette (excluding red and green)
const getRandomBgColor = () => {
  const colors = [
    'bg-blue-500',
    'bg-yellow-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-lime-500',
    'bg-rose-500',
  ]
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}

const NewTask = ({ data }) => {
  const randomBgColor = getRandomBgColor()

  return (
    <div className={`flex-shrink-0 h-full w-[300px] p-5 ${randomBgColor} rounded-xl`}>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{data.taskTitle}</h2>
      <p className='text-sm mt-2'>{data.taskDescription}</p>
      <div className='mt-6'>
        <button className='bg-blue-500 rounded font-medium py-1 px-2 text-xs'>
          Accept Task
        </button>
      </div>
    </div>
  )
}

export default NewTask
