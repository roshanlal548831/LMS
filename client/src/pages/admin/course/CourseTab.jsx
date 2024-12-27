import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CourseTab = () => {
    const isPublished = false;
    const isLoading = false;
    const navigate = useNavigate()

    const[input,setInput] = useState({
      courseTitle:"",
      subTitle:"",
      description:"",
      category:"",
      courseLevel:"",
      coursePrice:"",
      courseThumbnail:""
    });

    const [previewThumbnail,setPreviewThumbnail] = useState("");

    const changeEventHandler = (e) => {
      const {name,value} = e.target;
      setInput({...input,[name]:value});
    };

    const selectCategory = (value) => {
      setInput({...input,category:value})
    };
    const selectCourseLevel = (value) => {
      setInput({...input,courseLevel:value})
    };
// get file
const selectThumbnail = (e) => {
  const file = e.target.files?.[0];
  console.log(file)
  if(file){
    setInput({...input,courseThumbnail:file});
    const fileReader = new FileReader();
    fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file)
    
  }
}
const onHandleSubmit = (e) => {
     e.preventDefault();
     console.log(input)
}
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
        <form onSubmit={onHandleSubmit}>
          <div>
             <div>
               <Label>Title</Label>
               <Input type="text" value={input.courseTitle} onChange={changeEventHandler} name="courseTitle" placeholder="Ex. Fullstack developer"/>
             </div>
             <div>
               <Label>SubTitle</Label>
               <Input type="text" value={input.subTitle} onChange={changeEventHandler} name="subTitle" placeholder="Ex. Become Fullstack developer from zero to hero in 2 months"/>
             </div>
             <div>
               <Label>Description</Label>
               <RichTextEditor input={input} setInput={setInput}/>
             </div>
             <div className='flex items-center gap-5 '>
              <div>
                  <Label>Category</Label>
                  <Select onValueChange={selectCategory}>
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
              <div>
                <Label>Course Level</Label>
                <Select onValueChange={selectCourseLevel}>
                     <SelectTrigger className="w-[180px]">
                       <SelectValue placeholder="Select a course level" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectGroup>
                         <SelectLabel>Course Level</SelectLabel>
                         <SelectItem value="Next JS">Beginner</SelectItem>
                         <SelectItem value="Data Science">Medium</SelectItem>
                         <SelectItem value="Frontend">Advance</SelectItem>
                       </SelectGroup>
                     </SelectContent>
                   </Select>
              </div>
                 <div>
                    <Label>Price in (INT)</Label>
                    <Input 
                    type="number" 
                    name="coursePrice" 
                    value={input.coursePrice} 
                    onChange={changeEventHandler}
                    placeholder="199"
                  />
                 </div>
             </div>
                 <div>
                 <Label>Course Thumbnail</Label>
                  <Input
                  type="file"
                  onChange={selectThumbnail}
                  accept="image/*"
                  className="w-fit"
                  />
                  {
                    previewThumbnail && <img src={previewThumbnail} alt="thumnail" className='w-64 my-2'/>
                  }
                 </div> 
                 <div>
                   <Button variant="outline" onClick={()=> navigate("/admin/course")}>Cancel</Button>
                   <Button variant="" disabled={isLoading} type="submit">
                    {
                      isLoading ? (
                        <>
                        <Loader2 className=' h-4 w-4 animate-spin '/>
                        Please wait...
                        </>
                      ) :"Save"
                    }
                   </Button>
                 </div>
          </div>
          </form>
       </CardContent>
    </Card>
  )
}

export default CourseTab
