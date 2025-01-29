import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'sonner'

const LectureTab = () => {
    const [title, setTitle] = useState("");
    const [uploadVideo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(true);
    const MEDIA_API = "http://localhost:8000/api/v1/media"

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/media/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    },
                });

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
            }
        }
    };

    return (
        <Card>
            <CardHeader className="flex justify-between ">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click when save</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant="destructive">Remove lecture</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Ex. Introduction to JavaScript" />
                </div>
                <div>
                    <Label>Video <span className='text-red-500'>*</span></Label>
                    <Input type="file" accept="video/*" onChange={fileChangeHandler} className="w-fit" />
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is this video free</Label>
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
                    <Button>Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab