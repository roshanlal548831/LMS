import { RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Auth from './pages/Auth';

function App() {

  return (
    <main>
        <Navbar/>
        <Auth/>
       
    </main>
  )
}

export default App
