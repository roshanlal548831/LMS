import React from 'react'
import Cours from './Cours'

const Mylearning = () => {
  const isLoading = false
  const myLearningCourses = [1,2,3,4]
  return (
     <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
      <h1 className='font-bold text-2xl '>Mylearning</h1>
      <div className='my-5'>
        <div>
            {
             isLoading ? (
             <MyLearningSkeleton/>
             ) : myLearningCourses.length === 0 ? (<p>You are not enrolled in any cours</p>) :
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
               {
                 [1,2,3,4,5,6,].map((courses,i) => <Cours key={i}/>)

               }
              </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Mylearning

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);