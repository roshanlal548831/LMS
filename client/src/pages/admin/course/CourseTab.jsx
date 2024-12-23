import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CourseTab = () => {
    const isPublished = false
  return (
    <Card>
       <CardHeader className="flex flex-row justify-between">
           <div>
               <CardTitle>Basic Course Information</CardTitle>
               <CardDescription>
                 Make changes to your course here, Click save when you're done.
               </CardDescription>
           </div>
           <div className='space-x-2 gap-2'>
             <Button variant="outline">
                   {
                       isPublished ? "Unpublished" : "Published"
                   }
                </Button>
                <Button variant="outline" className="text-white bg-red-400">Remove Course</Button>
             </div>
       </CardHeader>
       <CardContent>
          <div>
             <div>
               <Label>Title</Label>
               <Input type="text" name="CourseTitle" placeholder="Ex. Fullstack developer"/>
             </div>
             <div>
               <Label>SubTitle</Label>
               <Input type="text" name="SubTitle" placeholder="Ex. Become Fullstack developer from zero to hero in 2 months"/>
             </div>
             <div>
               <Label>Description</Label>
               <RichTextEditor/>
             </div>
          </div>
       </CardContent>
    </Card>
  )
}

export default CourseTab
