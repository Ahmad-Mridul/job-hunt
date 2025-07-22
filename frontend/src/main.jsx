import { createRoot } from 'react-dom/client';
import './index.css';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home/Home';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';


const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
          {
            path:'/',
            element:<Home/>
          },
          {
            path:'/register',
            element:<Register/>
          },
          {
            path:'/login',
            element:<Login/>
          }
        ]
    }
])
createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
