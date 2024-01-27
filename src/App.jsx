import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import MyContext from './context/MyContext'

function App() {
  const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.auth.userData)
    if (user) {
      return children
    }
    else {
      return <Navigate to='/login' />
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
      <MyContext>
        <RouterProvider router={router} />
      </MyContext>
    </>
  )
}

export default App
