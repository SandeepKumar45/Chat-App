import React, { useContext } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { useSelector } from 'react-redux'
import { menuContext } from '../context/MyContext'


function Sidebar() {
  const { hidden } = useContext(menuContext)
  const chat = useSelector(state => state.chat.user)
  return (
    <div className={`flex-1 bg-[#3e3c61] h-full md:h-4/5 absolute ${chat ? `${hidden ? `w-0` : 'w-3/5 md:w-1/5'}` : 
    `${hidden ? 'w-0' : 'w-full md:w-[65%]'}`} transition-all duration-500 `}>
      <div className={`h-full w-full relative overflow-hidden `}>
        <Navbar />
        <Search />
        <Chats />
      </div>
    </div>
  )
}

export default Sidebar