import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/authSlice'


function Navbar() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.userData)

  const handleClick = () => {
    dispatch(logout())
  }
  return (
    <div className='flex justify-between items-center bg-[#2f2d52] h-14 p-2 text-gray-50 '>
      <div className='flex items-center gap-2'>
        <img src={user.photoURL} alt="" className='bg-gray-50 h-8 w-8 rounded-full object-cover  ' />
        <span className='font-semibold'>{user.displayName}</span>
      </div>
      <button onClick={handleClick} className='bg-[#5d5b8d] text-gray-50 text-[14px] px-2 py-[2px] ml-3 border-none cursor-pointer '>logout</button>
    </div>
  )
}

export default Navbar