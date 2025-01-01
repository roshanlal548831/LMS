import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Auth from './pages/Auth';
import HeroSecction from './pages/student/HeroSecction';
import MainLayout from './layout/MainLayout';
import Login from './pages/Auth';
import Courses from './pages/student/Courses';
import Mylearning from './pages/student/Mylearning';
import Profile from './pages/student/Profile';
import Sidebar from './pages/admin/Sidebar';
import Dashbord from './pages/admin/Dashbord';
import CourseTable from './pages/admin/course/CourseTable';
import AddCourse from './pages/admin/course/AddCourse';
import EditCourse from './pages/admin/course/EditCourse';
import Createlecture from './pages/admin/lecture/createlecture';
const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"",
        element:(
        <>
        <HeroSecction/>
         <Courses/>
        </>
        ),
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/mylearning",
        element:<Mylearning/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      // admin route start here
      {
        path:"/admin",
        element:<Sidebar/>,  
        children:[
          {
            path:"dashboard",
            element:<Dashbord/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:createId",
            element:<EditCourse/>
          },
          {
            path:"course/:createId/lecture",
            element:<Createlecture/>
          },
        ]
      },
      
    ],
    
  }
])

function App() {

  return (
    <main>
       <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
