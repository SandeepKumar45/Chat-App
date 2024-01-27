import React, {useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice';
import { clearChat } from '../features/chatSlice';



function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        setLoad(true)

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    // switch (snapshot.state) {
                    //     case 'paused':
                    //         console.log('Upload is paused');
                    //         break;
                    //     case 'running':
                    //         console.log('Upload is running');
                    //         break;
                    // }
                },
                (error) => {
                    console.log(error);
                    setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //Update profile
                        await updateProfile(auth.currentUser, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        // Create user on firestore
                        await setDoc(doc(db, "users", auth.currentUser.uid), {
                            uid: auth.currentUser.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", auth.currentUser.uid), {});

                        dispatch(login({
                            uid: auth.currentUser.uid,
                            displayName: auth.currentUser.displayName,
                            email: auth.currentUser.email,
                            photoURL: auth.currentUser.photoURL
                        }))

                        dispatch(clearChat())
                        setLoad(false)
                        navigate('/');
                    });
                }
            );
        } catch (error) {
            console.log(error);
            setError(true)
            setLoad(false)
        }
    }
    return (
        <div className="bg-[#a7bcff] h-screen flex justify-center items-center ">
            <div className="bg-white py-5 px-[20px] md:px-[60px] rounded-xl flex flex-col gap-3 items-center ">
                <span className="text-[#5d5b8d] font-bold text-xl ">Ignite Chat</span>
                <span className="text-[#5d5b8d] text-[12px] ">Register</span>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input required type="text" placeholder="display name" className='p-4 border-b border-[#a7bcff] placeholder:text-gray-400 outline-none w-60 ' />
                    <input required type="email" placeholder="email" className='p-4 border-b border-[#a7bcff] placeholder:text-gray-400 outline-none w-60 ' />
                    <input required type="password" placeholder="password" className='p-4 border-b border-[#a7bcff] placeholder:text-gray-400 outline-none w-60 ' />
                    <input required type="file" id="file" className='hidden' />
                    <label htmlFor="file" className='flex items-center gap-2 text-[#8da4f1] text-xs cursor-pointer '>
                        <img src="https://cdn-icons-png.flaticon.com/128/10054/10054290.png" alt="" className='w-8 ' />
                        <span>Add an avatar</span>
                    </label>
                    <button className='bg-[#7b96ec] text-white p-2 font-bold border-none cursor-pointer '>
                        {!load ? <span>Sign up</span> : <div role="status">
                            <svg aria-hidden="true" className="inline w-7 h-7 text-gray-50 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        }
                    </button>
                    {error && <span className='text-red-600'>Something went wrong</span>}
                </form>
                <p className='text-[#5d5b8d] text-xs mt-2 '>
                    You do have an account? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register