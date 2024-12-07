import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const HeroSecction = () => {
  return (
    <div className='relative bg-gradient-to-r  from-blue-500 bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center'>
         <div className='max-w-3xl mx-auto inline-block'>
             <h1 className='text-white text-4xl font-bold my-5'>Find the best courses for you</h1>
             <p className='text-gray-200 dark:text-gray-400'>Discover,Learn,and UpSkill with our video wide range of courses</p>
             <form className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl md-6 my-4'>
               <Input
               type="text"
               placeholder="Search Cours"
               className="flex-grow border-none focus-visible:ring-0 p-6 py-3 text-gray-400 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
               />
               <Button className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 ">Search</Button>
             </form>
               <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
         </div>
    </div>
  )
}

export default HeroSecction
