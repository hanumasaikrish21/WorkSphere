import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { setLocalStorage } from '../../utils/localStorage'

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [assignee, setAssignee] = useState('')
    const [category, setCategory] = useState('')
    
    const [userData, setUserData] = useContext(AuthContext)

    const submitHandler = (e) => {
        e.preventDefault()

        // Find the assignee (employee) by name
        const employee = userData.employees.find(emp => emp.firstName === assignee)

        if (employee) {
            // Create a new task object
            const newTask = {
                active: true,
                newTask: true,
                completed: false,
                failed: false,
                taskTitle,
                taskDescription,
                taskDate,
                category
            }

            // Add the new task to the employee's tasks
            employee.tasks.push(newTask)

            // Update the employee's task counts
            employee.taskCounts.active += 1
            employee.taskCounts.newTask += 1

            // Update localStorage with the new employees data
            setLocalStorage()

            // Update the context with the new user data
            setUserData({ ...userData })
        } else {
            alert("Employee not found!")
        }

        // Reset the form
        setTaskTitle('')
        setTaskDescription('')
        setTaskDate('')
        setAssignee('')
        setCategory('')
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="date"
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
                        <input
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="text"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            placeholder='Employee name'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='design, dev, etc'
                        />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea
                        className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask
