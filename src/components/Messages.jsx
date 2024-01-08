import React, {useState,useEffect} from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase'



function Messages() {
  const [messages,setMessages] = useState([])
  const chat = useSelector(state => state.chat)

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  },[chat.chatId])
  return (
    <div className='bg-[#ddddf7] p-2 flex-1 overflow-y-scroll '>
      {messages.map((m)=>{
        return <Message message={m} key={m.id}/>
      })}
    </div>
  )
}

export default Messages