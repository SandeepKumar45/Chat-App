import React, { useState } from "react";
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from 'react-redux';



function Search() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const currentUser = useSelector(state => state.auth.userData)

  const handleSearch = async () => {
    setUser(null)
    if (username) {
      const q = query(collection(db, "users"),
       where("displayName", "==", username),
       where("uid", "!=", currentUser.uid)
       );
    try {
      const querySnapshot = await getDocs(q);
      {querySnapshot.docs.length == 0 && setError(true)}
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      console.log(error);
      setError(false)
    }
    setTimeout(()=>{
      setError(false)
    },4000)
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null)
    setUsername("")
  }

  return (
    <div className="border-b border-gray-800">
      <div className="p-2">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          className="bg-transparent border-none text-white outline-none placeholder:text-gray-500 " />
      </div>
      {error && <span className="text-white font-bold p-4">user not found</span>}
      {user && <div onClick={handleSelect} className="p-2 flex items-center gap-2 text-white cursor-pointer hover:bg-[#2f2d52]">
        <img
          src={user.photoURL}
          alt="" className="w-12 h-12 rounded-full object-cover "
        />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
}

export default Search;
