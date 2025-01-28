import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React, { useState } from 'react'

const LectureTab = () => {
    const [title, setTitle] = useState("");
    const [uploadVideo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);

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
                    <Input type="file" accept="video/*" className="w-fit" />
                </div>
                <div className='flex items-center space-x-2 my-5'>
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Is this video free</Label>
                </div>
                <div className='mt-4'>
                    <Button>Update Lecture</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab