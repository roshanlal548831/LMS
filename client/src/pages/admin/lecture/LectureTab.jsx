import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const MEDIA_API = "http://localhost:8000/api/v1/media";

const LectureTab = () => {
    const [title, setTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [url, setUrl] = useState("")


    const { createId, lectureId } = useParams()

    const { data: lectureData, } = useGetLectureByIdQuery(lectureId)
    const lecture = lectureData?.lecture;

    useEffect(() => {
        if (lecture) {
            setTitle(lecture.lectureTitle);
            setIsFree(lecture.isPreviewFree);
            setUrl(lecture.videoUrl)

        }
    }, [lecture])

    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();


    console.log("this is lecture Data", lectureData)
    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                setLoading(true)
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    },
                });

                console.log(res.data.data.url)

                if (res.data.success) {
                    console.log("this is result => ", res);
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id,
                    });
                    setBtnDisable(false);
                    toast.success(res.data.message);
                }
            } catch (error) {
                console.log("this is errorr ====> ", error);
                toast.error("video upload failed");
            } finally {
                setMediaProgress(false);
                setLoading(false)
            }
        }
    };

    const editLectureHandler = async () => {
        await editLecture({
            lectureTitle: title, isPreviewFree: isFree, videoInfo: uploadVideoInfo, createId, lectureId
        })
    }

    const [removeLecture, { data: removeData, isSuccess: lectureIsSuccess, error: removeError, isLoading: removeLoading }] = useRemoveLectureMutation();

    const removeLectureHandler = async () => {
        await removeLecture({ lectureId });
        console.log(lectureData.data)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
        };
        if (error) {
            toast.error(error.data.message)
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (lectureIsSuccess) {
            toast.success(removeData.message),
                navigate(`/admin/course/${createId}/lecture`)
        };
        if (removeError) {
            toast.error(removeError.data.message)
        }
    }, [lectureIsSuccess, removeError])

    return (
        <Card>
            <CardHeader className="flex justify-between ">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click when save</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant="destructive" disabled={removeLoading} onClick={removeLectureHandler}>
                        {
                            removeLoading ? <><Loader2 className='animate-spin h-4 w-4' /> Please wait...</> : 'Remove lecture'
                        }
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Introduction to JavaScript" />
                </div>
                <div>
                    <Label>Video <span className='text-red-500'>*</span></Label>
                    <Input type="file" accept="video/*" onChange={fileChangeHandler} className="w-fit" />
                </div>
                {
                    lecture?.videoUrl && (
                        <div>
                            <iframe
                                className="w-1/2 h-1/2 sm:h-96 rounded-lg"
                                src={url}
                                title="Video Player"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )
                }

                <div className="flex items-center space-x-2 my-5">
                    <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is this video FREE</Label>
                </div>


                {

                    mediaProgress && (
                        <div className='my-4'>
                            <Progress value={uploadProgress} />
                            <p>{uploadProgress}% uploaded</p>
                        </div>
                    )
                }

                <div className='mt-4'>
                    <Button onClick={editLectureHandler} disabled={loading || isLoading}>
                        {
                            loading ? <><Loader2 className='animate-spin h-4 w-4' />Uploading video...</> : isLoading ? <> <Loader2 className='animate-spin h-4 w-4' />Please wait...</> : "Update lecture"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab