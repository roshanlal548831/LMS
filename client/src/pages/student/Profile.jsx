import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React from 'react'

const Profile = () => {
  const isLoading = false
  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
        <div className='flex flex-col items-center'>
             <Avatar className="h-24 w-24 md:w-32 md:h-32 mb-4 ">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
        </div>
        <div>
            <div className='mb-2'>
               <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
                name:
                <span className='font-normal text-gray-700 dark:text-gray-300 mx-1'>Roshan lal</span>
                </h2>
            </div>
            <div className='mb-2'>
               <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
                email:
                <span className='font-normal text-gray-700 dark:text-gray-300 mx-1'>roshanlal@ouspa.com</span>
                </h2>
            </div>
            <div className='mb-2'>
               <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
                Role:
                <span className='font-normal text-gray-700 dark:text-gray-300 mx-1'>INSTRUCTOR</span>
                </h2>
            </div>
            <Dialog>
               <DialogTrigger asChild>
                  <Button size="sm" className="mt-2">Edit Profile</Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changed to your profile here. Click save when you're done.
                      </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                       <Label>Name</Label>
                       <Input type="text" placeholder="Name" className="col-span-3"/>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                       <Label>Profile Photo</Label>
                       <Input type="file" accept="image/*" className="col-span-3"/>
                    </div>
                  </div>
                  <DialogFooter>
                  <Button disabled={isLoading}>
                           {
                            isLoading ? (
                              <>
                              <Loader2 className='mr-2 w-4 animate-spin'/> Please wait...
                              </>
                            ) : "Save Changes"
                           }
                        </Button>
                  </DialogFooter>
               </DialogContent>
            </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Profile
