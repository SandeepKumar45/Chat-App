import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'


function Home() {
  return (
    <div className='bg-[#a7bcff] h-screen flex justify-center items-center '>
      <div className="w-full h-full md:w-[65%] md:h-4/5 flex border border-white rounded-lg overflow-hidden ">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home