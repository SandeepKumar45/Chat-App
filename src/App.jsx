import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

function App() {
  const ProtectedRoute = ({children}) => {
    const user = useSelector(state=>state.auth.userData)
    if (user) {
      return children
    }
    else{
      return <Navigate to='/login'/>
    }
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
                    <Home /> 
               </ProtectedRoute>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
