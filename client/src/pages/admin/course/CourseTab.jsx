import Skeletom from '@/components/mode/Skeletom'
import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByIdQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast} from 'sonner'

const CourseTab = () => {
    const isPublished = false;
    // const isLoading = false;
    const navigate = useNavigate()
    const [editCourse,{data,isLoading,isSuccess,error}] = useEditCourseMutation();
    
    const[input,setInput] = useState({
      courseTitle:"",
      subTitle:"",
      description:"",
      category:"",
      courseLevel:"",
      coursePrice:"",
      courseThumbnail:""
    });
    
    const params = useParams();
    const courseId = params.createId;

    const {data:courseByIdData,isLoading:courseByIdLoading} = useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});
    const [previewThumbnail,setPreviewThumbnail] = useState("");

  //  console.log(course)
    useEffect(()=>{
    if(courseByIdData?.course){
      const course = courseByIdData?.course;
      setInput({
        courseTitle:course?.courseTitle,
        subTitle:course?.subTitle,
        description:course?.description,
        category:course?.category,
        courseLevel:course?.courseLevel,
        coursePrice:course?.coursePrice,
      });
      // console.log(course?.courseThumbnail)
      setPreviewThumbnail(course?.courseThumbnail)
    }
    },[courseByIdData])
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
const onHandleSubmit = async(e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append("courseTitle",input.courseTitle)
     formData.append("subTitle",input.subTitle)
     formData.append("description",input.description)
     formData.append("category",input.category)
     formData.append("courseLevel",input.courseLevel)
     formData.append("coursePrice",input.coursePrice)
     formData.append("courseThumbnail",input.courseThumbnail)
     console.log(formData)
     await editCourse({formData,courseId});
};

useEffect(()=>{
  if(isSuccess){
    toast.success(data?.message || "Course updated.")
  };
   if(error){
    toast.error(error?.data?.message || "Failed to update course")
   };
},[isSuccess]);

if(courseByIdLoading) return <Skeletom/>

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
                 <div className='mt-3'>
                 <Label>Course Thumbnail</Label>
                  <Input
                  type="file"
                  onChange={selectThumbnail}
                  accept="image/*"
                  className="w-fit"
                  />
                  {
                    previewThumbnail && <img src={previewThumbnail} alt="thumnail" className='w-1/2 my-2'/>
                  }
                 </div> 
                 <div>
                   <Button variant="outline" className="m-3" onClick={()=> navigate("/admin/course")}>Cancel</Button>
                   <Button variant="" disabled={isLoading} type="submit" className="m-3">
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
