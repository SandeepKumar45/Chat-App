import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from 'react';
import { db } from '../firebase/firebase'
import { chat } from '../features/chatSlice';


function Chats() {
  const [chats, setChats] = useState([])
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
    dispatch(chat({chatId:data[0],user:data[1].userInfo}))
  }
  return (
    <div className="chats">
      {chats?.sort((a,b)=>b[1].date - a[1].date).map((chat) => {
        return <div key={chat[0]} onClick={()=>handleSelect(chat)} className="p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52]">
          <img
            src={chat[1].userInfo.photoURL}
            alt="" className="w-12 h-12 rounded-full object-cover "
          />
          <div className="userChatInfo">
            <span className='text-lg font-medium '>{chat[1].userInfo.displayName}</span>
            <p className='text-sm text-gray-400 '>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      })}
    </div>
  )
}

export default Chats