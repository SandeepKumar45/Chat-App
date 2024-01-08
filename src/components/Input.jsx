import React, {useState} from 'react'
import { db, storage } from '../firebase/firebase'
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";




function Input() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const currentUser = useSelector(state => state.auth.userData)
  const chat = useSelector(state => state.chat)


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        (snapshot) => { },
        (error) => { },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chat.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      if (text) {
        await updateDoc(doc(db, "chats", chat.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chat.chatId + ".lastMessage"]: {
        text,
      },
      [chat.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chat.user.uid), {
      [chat.chatId + ".lastMessage"]: {
        text,
      },
      [chat.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  }
  
  return (
    <div className='h-12 p-2 bg-white flex justify-between items-center '>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        className='w-full outline-none text-[#2f2d52] text-lg placeholder:text-gray-400 '
      />
      <div className="flex items-center gap-2 ">
        <input
          type="file"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
          className='hidden '
        />
        <label htmlFor="file">
          <MdOutlineAddPhotoAlternate className='h-6 w-6 text-gray-500 '/>
        </label>
        <button onClick={handleSend} className='border-none py-1 px-3 text-white bg-[#8da4f1] cursor-pointer '>Send</button>
      </div>

    </div>
  )
}

export default Input