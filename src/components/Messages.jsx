import React, {useState,useEffect,useRef} from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase'



function Messages() {
  const [messages,setMessages] = useState([])
  const chat = useSelector(state => state.chat)
  const ref = useRef()

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      scrollToBottom()
    });

    return () => {
      unSub();
    };
  },[chat.chatId])

  const scrollToBottom = () => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  };


  return (
    <div ref={ref} className='bg-[#ddddf7] p-2 flex-1 overflow-y-scroll '>
      {messages.map((m)=>{
        return <Message message={m} key={m.id}/>
      })}
    </div>
  )
}

export default Messages