import React, {useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'


function Message({message}) {
  const time = {
    hour:message.date.toDate().getHours().toString().padStart(2,'0'),
    minute:message.date.toDate().getMinutes().toString().padStart(2,'0')
  }

  const currentUser = useSelector(state=>state.auth.userData)
  const chat = useSelector(state => state.chat)

  const ref = useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({ behavior:"smooth" , block:"end" })
  },[message])


  return (
    <div ref={ref} className={`flex gap-5 mb-5 items-end ${message.senderId === currentUser.uid && 'flex-row-reverse'}`}>
      <div className="text-gray-500 flex flex-col items-center">
        <img src={
          message.senderId === currentUser.uid 
          ? currentUser.photoURL : chat.user.photoURL
        }
         alt="" className='w-7 h-7 rounded-full object-cover ' />
        <span className='text-sm'>{`${time.hour}:${time.minute}`}</span>
      </div>
      <div className={`max-w-[80%] flex flex-col gap-2 ${message.senderId === currentUser.uid && 'items-end'}`}>
        {message.img && <img src={message.img} alt="" className='w-1/2' />}
        {message.text && <p className={` py-2 px-5 rounded-e-lg rounded-es-lg max-w-max ${message.senderId === currentUser.uid ? 'bg-[#8da4f1]': 'bg-white'}`}>{message.text}</p>}
      </div>
    </div>
  )
}

export default Message