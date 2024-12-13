import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import  { useEffect, useState } from 'react'
import Cours from './Cours'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

const Profile = () => {

   const[name,setName] = useState("");
   const[profilePhotot,setProfilePhoto] = useState("");

   const {data,isLoading,refetch} = useLoadUserQuery();
   
   const [updateUser,{data:updateUserData,isLoading:updateUserIsloading,error,isSuccess}] = useUpdateUserMutation();

   console.log("this is error ",error)

   const onChangeHandler = (e) => {
         const file = e.target.files?.[0];
         if(file){
            setProfilePhoto(file)
         }
   }

   const updateUserHandler = async(e)=> {
      e.preventDefault()
       const formData =new FormData();
       formData.append("name",name);
       formData.append("profilePhoto",profilePhotot);
     await updateUser(formData);
   };

   useEffect(()=>{
      if(isSuccess){
         refetch();
         toast.success(updateUserData.message || "Profile updated.");
      };
      if(error){
         toast.error(error.data.message || "Failed to update profile.")
      }
   },[updateUserIsloading])

   if(isLoading){
      return <h1>Profile loading...</h1>

   }
   const user = data && data?.user
   console.log(user)
  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
      <h1 className='font-bold text-2xl text-center md:text-left'>Profile</h1>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
        <div className='flex flex-col items-center'>
             <Avatar className="h-24 w-24 md:w-32 md:h-32 mb-4 ">
                  <AvatarImage src={`${user?.photoUrl}` ||  "https://github.com/shadcn.png"} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
        </div>
        <div>
            <div className='mb-2'>
               <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
                name:
                <span className='font-normal text-gray-700 dark:text-gray-300 mx-1'>{user?.name}</span>
                </h2>
            </div>
            <div className='mb-2'>
               <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
                email:
                <span className='font-normal text-gray-700 dark:text-gray-300 mx-1'>{user?.email}</span>
                </h2>
            </div>
            <div className='mb-2'>
               <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
                Role:
                <span className='font-normal text-gray-700 dark:text-gray-300 mx-1'>{user?.role.toUpperCase()}</span>
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
                      <form onSubmit={updateUserHandler}>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                       <Label htmlFor="name">Name</Label>
                       <Input type="text" value={name} onChange={(e)=> setName(e.target.value)}  id="name" name="name" placeholder="Name" className="col-span-3"/>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                       <Label htmlFor="photoUrl">Profile Photo</Label>
                       <Input type="file" id="photoUrl" onChange={onChangeHandler}  accept="image/*" className="col-span-3"/>
                    </div>
                  </div>
                  <DialogFooter>
                  <Button type="submit" disabled={isLoading} onClick={updateUserHandler}>
                           {
                            updateUserIsloading ? (
                              <>
                              <Loader2 className='mr-2 w-4 animate-spin'/> Please wait...
                              </>
                            ) : "Save Changes"
                           }
                        </Button>
                  </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
        </div>
      </div>
      <div>
          <h1 className='font-medium text-lg'>Courses you're enrolled in</h1>
           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
               user?.enrolledCourses?.length === 0 ? <h1>You haven't enrolled yet.</h1> : (
                  user?.enrolledCourses?.map((courses,i)=> <Cours course={user?._id} key={i}/>)
               )
            }
          </div>
      </div>
    </div>
  )
}

export default Profile
