import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  return (
    <div className='flex-1'>
        <div className='flex items-center justify-between md-5'>
           <h1 className='font-bold text-xl'>ADd details information regarding course </h1>
           <Link to="">
             <Button variant="link" className="text-blue-500 hover:text-[#6ac3e1]">Go to lectures page</Button>
           </Link>
        </div>
        <CourseTab/>
    </div>
  )
}

export default EditCourse
