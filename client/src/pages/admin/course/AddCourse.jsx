import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
  const [courseTitle,setCourseTitle] = useState('');
  const [category,setCategory] = useState('');

  const [createCourse,{data,isLoading,error,isSuccess}] = useCreateCourseMutation();

  const navigate = useNavigate();
  // const isLoading = false;
console.log(data)

  
  const getSelectedCategory = (value) => {
    setCategory(value)
  };

  const createCourseHandler = async() => {
    console.log(courseTitle,category)
     await createCourse({courseTitle,category})
  };

  useEffect(()=>{
      if(isSuccess){
        toast.success(data?.message || "Course created.");
        navigate("/admin/course")
      }
  },[isSuccess,data,error])

  return (
    <div className='flex-1 mx-10'>
        <div className='md-4'>
            <h1 className='font-bold text-xl'>Let's add course, add some basic course details</h1>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt numquam dignissimos reiciendis?</p>
             <div>
                 <div className='space-y-4'>
                    <Label>Title</Label>
                    <Input type="text" name="title" placeholder="Your course name" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}/>
                 </div>
                 <div className='space-y-4'>
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                     <SelectTrigger className="w-[180px]">
                       <SelectValue placeholder="Select a category" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectGroup>
                         <SelectLabel>Category</SelectLabel>
                         <SelectItem value="Next JS">Next JS</SelectItem>
                         <SelectItem value="Data Science">Data Science</SelectItem>
                         <SelectItem value="Frontend">Frontend</SelectItem>
                         <SelectItem value="Fullstack Developer">Fullstack Developer</SelectItem>
                         <SelectItem value="MERN Stack Developer">MERN Stack Developer</SelectItem>
                         <SelectItem value="Javascript">Javascript</SelectItem>
                         <SelectItem value="Python">Python</SelectItem>
                         <SelectItem value="Docker">Docker</SelectItem>
                         <SelectItem value="MongoDB">MongoDB</SelectItem>
                         <SelectItem value="HTML">HTML</SelectItem>
                       </SelectGroup>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className='flex items-center gap-10 mt-4'>
                    <Button onClick={()=> navigate(`/admin/course`)} variant="outline">Back</Button>
                    <Button disabled={isLoading} onClick={()=> createCourseHandler()}>
                      {
                        isLoading ? (
                          <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                          Please wait...
                          </>
                        ):"Create"
                      }
                    </Button>
                 </div>
             </div>
        </div>
      
    </div>
  )
}

export default AddCourse
