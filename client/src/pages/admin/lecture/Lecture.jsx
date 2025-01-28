import { Edit2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({ lectures, index, courseId }) => {
  const navigate = useNavigate();

  const goToUpdateLecture = () => {
    navigate(lectures._id)
  }

  console.log(lectures, index + 1)
  return (
    <div className='flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md'>
      <h1 className='font-bold text-gray-800 dark:text-gray-100'>
        Lecture - {index + 1} : {lectures?.lectureTitle}
      </h1>
      <Edit2 onClick={goToUpdateLecture} size={20} className='cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400' />
    </div>
  )
}

export default Lecture
