import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Cours = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
         <div className='relative'>
             <img src="https://cdnblog.webkul.com/blog/wp-content/uploads/2024/02/next-js-image-component.png" className='w-full h-36 object-cover rounded-t-lg' alt="videolink" />
         </div>
         <CardContent className="px-5 py-4 space-y-3">
             <h1 className='hover:underline font-bold truncate'>Next.js Complate Cours in Hindi 2024</h1>
             <div className='flex items-center gap-3'>
             <div className='flex items-center gap-3 '>
             <Avatar className="h-8 w-8">
               <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
               <h1 className='font-medium text-sm'>Roshan Lal</h1>
             </div>
              <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                 Advance
              </Badge>
             </div>
             <div className='text-lg font-bold'>
               <span> ₹ 499</span>
             </div>
         </CardContent>
      </Card>
    </div>
  )
}

export default Cours
