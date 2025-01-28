import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const createlecture = () => {
  const params = useParams()
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");

  const [createLecture, { data, isLoading, error, isSuccess, }] = useCreateLectureMutation();

  const {
    data: lectureData,
    isSuccess: lectureIsSuccess,
    error: lectureError,
    isLoading: lectureIsLoading,
    refetch
  } = useGetCourseLectureQuery({ courseId: params.createId }, { refetchOnMountOrArgChange: true });


  const createLectureHandler = async () => {
    createLecture({ lectureTitle, courseId: params.createId })
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      refetch();
    };
    if (error) {
      toast.error(error.data.message)
    }
  }, [isSuccess, error])

  return (
    <div className='flex-1 mx-10'>
      <div className='md-4'>
        <h1 className='font-bold text-xl'>Let's add lecture, add some basic details for your lecture</h1>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt numquam dignissimos reiciendis?</p>
        <div>
          <div className='space-y-4'>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Your tile name"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-10 mt-4'>
            <Button onClick={() => navigate(`/admin/course/${params.createId}`)} variant="outline">Back</Button>
            <Button variant="" disabled={isLoading} className="m-3" onClick={createLectureHandler}>
              {
                isLoading ? (
                  <>
                    <Loader2 className=' h-4 w-4 animate-spin ' />
                    Please wait...
                  </>
                ) : "Create lecture"
              }
            </Button>
          </div>
          <div className='mt-10'>
            {
              lectureIsLoading ? (<p>Loading lecture...</p>) : lectureError ? (<p>Failed to loading...</p>) : lectureData.lectures.length === 0 ? (<>No lecture available</>) : lectureData.lectures?.map((item, i) => <Lecture courseId={params.createId} lectures={item} index={i} key={i} />)
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default createlecture
