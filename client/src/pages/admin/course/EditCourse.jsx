import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  const navigate = useNavigate();
  return (
    <div className='flex-1'>
        <div className='flex items-center justify-between md-5'>
           <h1 className='font-bold text-xl'>ADd details information regarding course </h1>
           <Link to="lecture">
             <Button variant="link" className="text-[#6ac3e1] hover:text-[#6ac3e1] underline">Go to lectures page</Button>
           </Link>
        </div>
        <CourseTab/>
    </div>
  )
}

export default EditCourse
