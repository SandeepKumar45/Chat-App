import React, { useContext } from 'react'
import addfriend from '../assets/addfriend.png'
import videocamera from '../assets/videocamera.png'
import more from '../assets/more.png'
import Messages from './Messages'
import Input from './Input'
import { useSelector } from 'react-redux'
import { RiMenuUnfoldLine } from "react-icons/ri";
import { menuContext } from '../context/MyContext'



function Chat() {
  const chat = useSelector(state => state.chat.user)
  const { setHidden } = useContext(menuContext)
  return (
    chat && <div className='flex flex-col flex-[2] h-full '>
      <div className="h-12 bg-[#5d5b8d] flex items-center justify-between p-2 text-white ">
        <div className='flex items-center -ml-3'>
          <RiMenuUnfoldLine onClick={()=>setHidden((prev)=>!prev)} className='text-white w-10 cursor-pointer'/>
          <span className='-ml-1'>
            {chat.displayName}
          </span>
        </div>
        <div className="flex items-center gap-3 ">
          <img src={videocamera} alt="" className='h-6 w-[22px] cursor-pointer' />
          <img src={addfriend} alt="" className='h-[18px] cursor-pointer' />
          <img src={more} alt="" className='h-6 w-[18px] cursor-pointer' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat