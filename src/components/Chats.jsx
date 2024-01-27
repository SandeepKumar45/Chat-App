import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from 'react';
import { db } from '../firebase/firebase'
import { chat } from '../features/chatSlice';
import { menuContext } from '../context/MyContext';
import { RiMenuFoldLine } from "react-icons/ri";



function Chats() {
  const [chats, setChats] = useState([])
  const {setHidden} = useContext(menuContext)
  const chatUser = useSelector(state => state.chat.user)
  const currentUser = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(Object.entries(doc.data()))
    })
    return () => {
      unsub()
    }
  }, [currentUser.uid])

  const handleSelect = (data) => {
    setHidden((prev)=>!prev)
    dispatch(chat({chatId:data[0],user:data[1].userInfo}))
  }
  return (
    <div className="chats h-3/4 md:h-[72%] overflow-y-scroll">
      {chats?.sort((a,b)=>b[1].date - a[1].date).map((chat) => {
        return <div key={chat[0]} onClick={()=>handleSelect(chat)} className="p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52]">
          <img
            src={chat[1].userInfo.photoURL}
            alt="" className="w-12 h-12 rounded-full object-cover "
          />
          <div className="userChatInfo">
            <span className='text-lg font-medium whitespace-nowrap '>{chat[1].userInfo.displayName}</span>
            <p className='text-sm text-gray-400 whitespace-nowrap '>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      })}
      {chatUser && <RiMenuFoldLine onClick={()=>setHidden((prev)=>!prev)} className='text-white w-10 h-4 absolute bottom-5 right-2 cursor-pointer '/>}
    </div>
  )
}

export default Chats