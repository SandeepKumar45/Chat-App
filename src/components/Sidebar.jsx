import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='flex-1 bg-[#3e3c61] '>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar