import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi';
import { Edit } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import {  useNavigate } from 'react-router-dom'

const CourseTable = () => {
  const {data,error,isLoading,isSuccess,refetch} = useGetCreatorCourseQuery()

  const navigate = useNavigate();

  const course = data?.courses || [];

  if(isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <Button onClick={()=>navigate(`/admin/course/create`)}>Create a new course</Button>
      <Table>
  <TableCaption>A list of your recent courses.</TableCaption>
  <TableHeader>
    <TableRow>
    <TableHead className="w-[100px]">Price</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Title</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {
      course.map((course,i)=> (
       <TableRow key={i}>
      <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
      <TableCell className="font-medium" ><Badge>{course?.isPublist ? "Published" : "Draft"}</Badge></TableCell>
      <TableCell className="">{course?.courseTitle}</TableCell>
      <TableCell className="text-right">
        <Button size="sm" variant="ghost" onClick={() => navigate(`${course._id}`)}><Edit/></Button>
      </TableCell>

    </TableRow>
      ))
    }
    
  </TableBody>
</Table>
    </div>
  )
}

export default CourseTable
