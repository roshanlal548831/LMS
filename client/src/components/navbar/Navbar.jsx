import { Cloud, CreditCard, Edit2, Github, Keyboard, LayoutDashboard, LifeBuoy, LogOut, LucideFileWarning, Mail, Menu, MessageSquare, Plus, PlusCircle, School, Settings, User, UserPlus, Users } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import DarkMode from '../mode/DarkMode'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

const Navbar = () => {
const user = true


const [logoutUser,{data,isSuccess}] = useLogoutUserMutation();
const navigate = useNavigate()

const role  = "instructor";
const logoutHandler = async() => {
  await logoutUser();
};

useEffect(()=>{
  if(isSuccess){
    navigate("/login")
   toast.success(data.message || "User Log out.");
  }
},[isSuccess]);



  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
      {/* Desktop */}
       <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-2'>
        <School size={"30"}/>
        <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
      </div>
       {/* User icone and dark mode */}
       <div className='flex items-center gap-8'>
        {
       user ? (
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar className="cursor-pointer">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LucideFileWarning/>
            <NavLink to="/mylearning">My learning</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit2/>
            <NavLink to="/profile">Edit Profile</NavLink>
          </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem>
            <LayoutDashboard/>
             <span>Dashbord</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <LogOut/>
            <span onClick={logoutHandler}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
       ):
       (
        <div className='flex items-center gap-2'>
           <Button variant="outline">Login</Button>
           <Button>Signup</Button>
        </div>
       )
        }
         <DarkMode/>
       </div>
      </div>
      {/* mobile device */}
      <div className='flex md:hidden items-center justify-between px-4 h-full'>
      <h1 className='font-extrabold text-2xl'>E-Learning</h1>
       <MobileNavbar/>
      </div>
    </div>
  )
}

export default Navbar

const MobileNavbar = () => {

  const [logoutUser,{data,isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate()

  const role  = "instructor";
  const logoutHandler = async() => {
    await logoutUser();
  };

  useEffect(()=>{
    if(isSuccess){
      navigate("/login")
     toast.success(data.message || "User Log out.");
    }
 },[isSuccess]);

  return (
         <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200"><Menu/></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
           <DarkMode/>
        </SheetHeader>
        <Separator className='mr-2'/>
        <nav className='flex flex-col space-y-4 mb-5'>
              <NavLink to="/mylearning">My learning</NavLink>
              <NavLink to="/profile">Edit Profile</NavLink>
              <span onClick={logoutHandler}>Log Out</span>
        </nav>
         {
            role === "instructor" && (
            <SheetFooter>
             <SheetClose asChild>
            <Button type="submit">DashBord</Button>
            </SheetClose>
             </SheetFooter>
            )
          }
          </SheetContent>
    </Sheet>
  )
}
