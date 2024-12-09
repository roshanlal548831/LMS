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
    ]
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
